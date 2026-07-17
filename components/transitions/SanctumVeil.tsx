"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FlameMandala } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * The seamless descent. Each god lives on his own route (a "microservice"), but
 * the redirect must be invisible: on any internal navigation this veil drops the
 * world to void, holds through the route swap, then lifts as the next page
 * kindles — so the visitor only ever feels a descent through darkness, never a
 * page load. No router intercept needed: it listens for the navigation click in
 * the capture phase (before next/link swaps the tree) and lifts when the new
 * pathname commits.
 */
export function SanctumVeil() {
  const pathname = usePathname();
  const [covering, setCovering] = useState(false);
  const lastPath = useRef(pathname);
  const coverAt = useRef(0);

  // Drop the veil the instant an internal navigation begins.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const target = a.getAttribute("target");
      if ((target && target !== "_self") || a.hasAttribute("download")) return;

      const raw = a.getAttribute("href");
      if (!raw) return;
      let url: URL;
      try {
        url = new URL(raw, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external
      if (url.pathname === window.location.pathname) return; // same page / in-page hash

      coverAt.current = Date.now();
      setCovering(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Lift once the new route commits — but only after the veil has been opaque
  // long enough to actually hide the swap.
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    const held = Date.now() - coverAt.current;
    const wait = Math.max(0, 380 - held);
    const t = setTimeout(() => setCovering(false), wait);
    return () => clearTimeout(t);
  }, [pathname]);

  // Safety: never let the veil stick if a navigation is cancelled.
  useEffect(() => {
    if (!covering) return;
    const safety = setTimeout(() => setCovering(false), 1600);
    return () => clearTimeout(safety);
  }, [covering]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-void transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)]",
        covering ? "opacity-100 duration-[360ms]" : "opacity-0 duration-[620ms]"
      )}
    >
      <FlameMandala
        aria-hidden
        className={cn(
          "h-24 w-24 text-accent transition-all duration-700",
          covering ? "slow-spin scale-100 opacity-70" : "scale-90 opacity-0"
        )}
      />
    </div>
  );
}
