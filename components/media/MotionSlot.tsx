"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLeanMedia } from "@/lib/adaptive";
import { cn } from "@/lib/cn";

/**
 * Blur scale (plan.md §2) — blur itself signals proximity, so it is named, not
 * arbitrary. `true` is an alias for the deepest, "threshold" blur.
 *   threshold (48px) — landing / deep veil: presence, never a portrait
 *   veil      (24px) — lifted a touch: a form you almost resolve
 *   near       (8px) — on the brink of revelation
 */
export type BlurLevel = boolean | "threshold" | "veil" | "near";

const BLUR_CLASS: Record<"threshold" | "veil" | "near", string> = {
  threshold: "blur-[48px]",
  veil: "blur-[24px]",
  near: "blur-[8px]",
};

function blurClass(blur: BlurLevel): string | undefined {
  if (!blur) return undefined;
  if (blur === true) return BLUR_CLASS.threshold;
  return BLUR_CLASS[blur];
}

/**
 * A god's motion, one path or two. A bare string is fine (type inferred from
 * the extension); ship both codecs as `{ webm, mp4 }` and the browser picks
 * the lighter one it can play.
 */
export type MotionSource = string | { webm?: string; mp4?: string };

function toSources(video: MotionSource): { src: string; type: string }[] {
  if (typeof video === "string") {
    return [
      {
        src: video,
        type: video.endsWith(".webm") ? "video/webm" : "video/mp4",
      },
    ];
  }
  const out: { src: string; type: string }[] = [];
  if (video.webm) out.push({ src: video.webm, type: "video/webm" });
  if (video.mp4) out.push({ src: video.mp4, type: "video/mp4" });
  return out;
}

/**
 * The video-ready socket. Everywhere a god-motion belongs, use a MotionSlot:
 * it always paints the still (optionally blurred + Ken-Burns) — that is the
 * LCP and the only thing search bots and reduced-motion visitors ever get.
 * The day a `video` path exists in the registry, the clip lazy-mounts when the
 * slot nears the viewport, fades in over the still once it is actually
 * playing, pauses offscreen, and falls back to the still on any error.
 *
 * Landing/gallery usage = blurred (never disclose the form); the sanctum, clear.
 */
export function MotionSlot({
  src,
  video,
  alt = "",
  priority = false,
  blur = false,
  kenBurns = false,
  paused = false,
  quality,
  sizes = "100vw",
  className,
  mediaClassName,
  children,
}: {
  src: string;
  video?: MotionSource;
  alt?: string;
  priority?: boolean;
  /** Named blur level (or `true` = threshold). Composes with Tailwind filters. */
  blur?: BlurLevel;
  kenBurns?: boolean;
  /** Parent-controlled gate — e.g. the landing crossfade stack plays only the
   *  active layer. A paused slot never mounts (or resumes) its video. */
  paused?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  /** Extra classes on the media element itself (e.g. brightness/grayscale to
   *  crush a backdrop toward black). Applied to both <Image> and <video>. */
  mediaClassName?: string;
  /** Overlays — gradients, vignette. */
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Data Saver / 2G / low-memory visitors keep the still — the video never
  // mounts, exactly as under reduced motion. Load-shedding, not degradation:
  // the still IS the designed fallback.
  const lean = useLeanMedia();
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  // Latch: once a video has mounted it stays mounted (keeps its buffer) and is
  // only play/paused from then on.
  const [everActive, setEverActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const sources = video && !failed ? toSources(video) : [];
  const hasVideo = sources.length > 0;

  // Honour prefers-reduced-motion, live. Until known (first client tick) the
  // still stands alone — the server markup never contains the video.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Lazy gate — mount/play only near the viewport, warm a little early.
  useEffect(() => {
    if (!hasVideo) return;
    const node = containerRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "220px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [hasVideo]);

  const active = hasVideo && !lean && reduceMotion === false && inView && !paused;

  useEffect(() => {
    if (active) setEverActive(true);
  }, [active]);

  // Drive playback from activity; a rejected play() (autoplay policy) simply
  // leaves the still standing.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active, everActive]);

  const blurC = blurClass(blur);
  // Zoom slightly so the soft, blurred edges never reveal the frame border.
  const zoom = blur && !kenBurns ? { transform: "scale(1.6)" } : undefined;
  const mediaClasses = cn(kenBurns && "kenburns", blurC, mediaClassName);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* The still is always painted — poster, LCP, bot content, and the
          reduced-motion / error / autoplay-blocked fallback. */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality ?? (blur ? 35 : 75)}
        className={cn("object-cover", mediaClasses)}
        style={zoom}
      />
      {everActive && !failed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out",
            playing ? "opacity-100" : "opacity-0",
            mediaClasses
          )}
          style={zoom}
        >
          {sources.map((s) => (
            <source
              key={s.src}
              src={s.src}
              type={s.type}
              onError={() => setFailed(true)}
            />
          ))}
        </video>
      )}
      {children}
    </div>
  );
}
