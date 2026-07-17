"use client";

import { useEffect, useRef } from "react";
import type { AtmosphereKind } from "@/services/karuppu";
import { isLeanMedia } from "@/lib/adaptive";
import { cn } from "@/lib/cn";

/**
 * The room's WEATHER (plan.md §14) — one full-viewport canvas, six signatures,
 * every mote drawn in the god's own colour:
 *
 *   iron     falling chain-glints, heavy and slow; a rare link flashes
 *   embers   few, large embers rising — monumental, flickering
 *   camphor  swift darting trails of cold light, gone in under a second
 *   grove    leaf-flecks sinking on a pendulum sway
 *   spirits  soft spirit-lights drifting toward the far shore
 *   hunt     fireflies that blink on and off; a tenth are paired eye-glints
 *
 * Discipline: sparse, near-black, screen-blended (light adds over the dark and
 * vanishes over ash text — the weather can never obstruct reading). It pauses
 * when the tab hides, halves itself on lean connections, and collapses to a
 * single static whisper of a frame under prefers-reduced-motion.
 */

/** One mote of weather. */
type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Radius — or streak length for the linear kinds. */
  size: number;
  /** Base alpha. */
  a: number;
  /** Per-mote oscillator offset. */
  phase: number;
  /** Sway amplitude / eye separation — kind-specific. */
  amp: number;
  /** Kind-specific period or rate (s). */
  cycle: number;
  age: number;
  /** Lifespan in seconds; Infinity = immortal. */
  ttl: number;
  /** The rare highlighted mote — a hot link, a paired eye. */
  bright: boolean;
};

const rnd = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const TAU = Math.PI * 2;

/** Motes per 100,000 px² with hard caps — the air stays sparse by law. */
const DENSITY: Record<AtmosphereKind, { d: number; min: number; max: number }> = {
  iron: { d: 3.0, min: 14, max: 92 },
  embers: { d: 1.5, min: 10, max: 40 },
  camphor: { d: 0.85, min: 7, max: 22 },
  grove: { d: 2.4, min: 12, max: 72 },
  spirits: { d: 1.2, min: 8, max: 34 },
  hunt: { d: 1.7, min: 10, max: 46 },
};

function spawn(kind: AtmosphereKind, W: number, H: number, initial: boolean): Mote {
  const m: Mote = {
    x: rnd(0, W),
    y: rnd(0, H),
    vx: 0,
    vy: 0,
    size: 1,
    a: 0.2,
    phase: rnd(0, TAU),
    amp: 0,
    cycle: 1,
    age: 0,
    ttl: Infinity,
    bright: false,
  };
  switch (kind) {
    case "iron": {
      m.y = initial ? rnd(-40, H) : rnd(-90, -20);
      m.vy = rnd(26, 62);
      m.size = rnd(9, 22); // streak length
      m.amp = rnd(3, 10);
      m.a = rnd(0.08, 0.24);
      m.bright = Math.random() < 0.07;
      break;
    }
    case "embers": {
      m.y = initial ? rnd(0, H) : rnd(H + 10, H + 60);
      m.vy = -rnd(11, 34);
      m.size = rnd(1.1, 3.2);
      m.a = rnd(0.22, 0.5);
      m.cycle = rnd(0.4, 1.6);
      break;
    }
    case "camphor": {
      const heading = (Math.random() < 0.5 ? 0 : Math.PI) + rnd(-0.26, 0.26);
      const speed = rnd(210, 430);
      m.vx = Math.cos(heading) * speed;
      m.vy = Math.sin(heading) * speed;
      m.size = rnd(1, 1.8);
      m.a = rnd(0.3, 0.62);
      m.ttl = rnd(0.6, 1.3);
      break;
    }
    case "grove": {
      m.y = initial ? rnd(-20, H) : rnd(-60, -10);
      m.vy = rnd(10, 30);
      m.size = rnd(1.1, 2.6);
      m.amp = rnd(6, 20);
      m.cycle = rnd(0.5, 1.2);
      m.a = rnd(0.1, 0.3);
      break;
    }
    case "spirits": {
      m.x = initial ? rnd(0, W) : rnd(-40, -10);
      m.vx = rnd(9, 26);
      m.size = rnd(1.4, 4);
      m.a = rnd(0.12, 0.3);
      m.cycle = rnd(0.4, 1.1);
      break;
    }
    case "hunt": {
      m.vx = rnd(-7, 7);
      m.vy = rnd(-5, 5);
      m.size = rnd(0.9, 1.9);
      m.a = rnd(0.28, 0.55);
      m.cycle = rnd(3.5, 9);
      m.amp = rnd(5, 8); // separation of the paired eyes
      m.bright = Math.random() < 0.1;
      break;
    }
  }
  return m;
}

export function SanctumAtmosphere({
  kind,
  accent,
  className,
}: {
  kind: AtmosphereKind;
  /** The room's seam as a hex — every mote is this colour at low alpha. */
  accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // The god's colour, decomposed once for per-frame alpha compositing.
    const hex = /^#?([0-9a-f]{6})$/i.exec(accent.trim());
    const int = hex ? parseInt(hex[1], 16) : 0xeee8dd;
    const R = (int >> 16) & 255;
    const G = (int >> 8) & 255;
    const B = int & 255;
    const tint = (a: number) => `rgba(${R}, ${G}, ${B}, ${a})`;
    const dot = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
    };

    let W = 0;
    let H = 0;
    let motes: Mote[] = [];
    const lean = isLeanMedia();

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { d, min, max } = DENSITY[kind];
      let n = Math.max(min, Math.min(max, Math.round(((W * H) / 100_000) * d)));
      if (lean) n = Math.max(min, Math.round(n / 2));
      motes = Array.from({ length: n }, () => spawn(kind, W, H, true));
    };

    /** Advance + paint one mote; returns false when it must respawn. */
    const tick = (m: Mote, dt: number, t: number): boolean => {
      switch (kind) {
        case "iron": {
          m.y += m.vy * dt;
          const x = m.x + Math.sin(m.phase + t * 0.7) * m.amp;
          const a = m.bright
            ? 0.16 + 0.5 * (0.5 + 0.5 * Math.sin(m.phase + t * 2.2))
            : m.a;
          ctx.strokeStyle = tint(a);
          ctx.lineWidth = m.bright ? 1.4 : 1;
          ctx.beginPath();
          ctx.moveTo(x, m.y);
          ctx.lineTo(x, m.y + m.size);
          ctx.stroke();
          return m.y <= H + 30;
        }
        case "embers": {
          m.y += m.vy * dt;
          m.x += Math.sin(m.phase + t * (0.4 + m.cycle)) * 14 * dt;
          const a = m.a * (0.55 + 0.45 * Math.sin(m.phase + t * (1.2 + m.cycle)));
          ctx.fillStyle = tint(a * 0.22);
          dot(m.x, m.y, m.size * 3);
          ctx.fillStyle = tint(a);
          dot(m.x, m.y, m.size);
          return m.y >= -30;
        }
        case "camphor": {
          m.age += dt;
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          const a = m.a * Math.sin(Math.PI * Math.min(m.age / m.ttl, 1));
          ctx.strokeStyle = tint(a * 0.7);
          ctx.lineWidth = m.size;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * 0.055, m.y - m.vy * 0.055);
          ctx.stroke();
          ctx.fillStyle = tint(a);
          dot(m.x, m.y, m.size * 0.9);
          return m.age < m.ttl && m.x > -60 && m.x < W + 60;
        }
        case "grove": {
          m.y += m.vy * dt;
          const sway = Math.sin(m.phase + t * m.cycle);
          ctx.fillStyle = tint(m.a);
          ctx.beginPath();
          ctx.ellipse(m.x + sway * m.amp, m.y, m.size * 1.6, m.size * 0.7, sway * 0.9, 0, TAU);
          ctx.fill();
          return m.y <= H + 20;
        }
        case "spirits": {
          m.x += m.vx * dt;
          const y = m.y + Math.sin(m.phase + t * 0.5) * 7;
          const a = m.a * (0.55 + 0.45 * Math.sin(m.phase + t * m.cycle));
          ctx.fillStyle = tint(a * 0.2);
          dot(m.x, y, m.size * 3.2);
          ctx.fillStyle = tint(a);
          dot(m.x, y, m.size);
          return m.x <= W + 30;
        }
        case "hunt": {
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          if (m.x < -10) m.x = W + 10;
          if (m.x > W + 10) m.x = -10;
          if (m.y < -10) m.y = H + 10;
          if (m.y > H + 10) m.y = -10;
          const ph = ((t + m.phase) % m.cycle) / m.cycle;
          const on = ph < 0.3 ? Math.sin(Math.PI * (ph / 0.3)) : 0;
          const a = m.a * on;
          if (a > 0.004) {
            ctx.fillStyle = tint(a);
            dot(m.x, m.y, m.size);
            if (m.bright) dot(m.x + m.amp, m.y, m.size);
          }
          return true;
        }
      }
    };

    // Reduced motion: the weather holds one breath — a single, static, fainter
    // frame — instead of moving.
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      for (const m of motes) {
        ctx.fillStyle = tint(m.a * 0.5);
        dot(m.x, m.y, Math.max(m.size / 2, 1));
      }
    };

    let raf = 0;
    let last = 0;
    let t = 0;
    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      t += dt;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < motes.length; i++) {
        if (!tick(motes[i], dt, t)) motes[i] = spawn(kind, W, H, false);
      }
      raf = requestAnimationFrame(frame);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };
    const start = () => {
      stop();
      if (mq.matches) {
        drawStatic();
      } else if (!document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };
    const onResize = () => {
      resize();
      if (mq.matches) drawStatic();
    };

    resize();
    start();
    mq.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      mq.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("resize", onResize);
    };
  }, [kind, accent]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn(
        // Screen blend: the weather is pure added light — it glows over the
        // void and vanishes over ash text, so it can never obstruct reading.
        "pointer-events-none fixed inset-0 z-0 mix-blend-screen",
        className
      )}
    />
  );
}
