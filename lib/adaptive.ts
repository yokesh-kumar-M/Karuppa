"use client";

import { useEffect, useState } from "react";

/**
 * Lean-media detection — the client-side half of "load balancing" for a static
 * shrine. When the visitor is on Data Saver, a 2G-class connection, or a very
 * low-memory device, the heavy layers shed themselves: MotionSlot never mounts
 * its video (the still stands alone, exactly like reduced-motion) and the
 * sanctum weather halves its particle count. The site never asks — it adapts.
 */

/** Narrow view of the (non-standard) Network Information API. */
type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", cb: () => void) => void;
  removeEventListener?: (type: "change", cb: () => void) => void;
};

type AdaptiveNavigator = Navigator & {
  connection?: NetworkInformation;
  deviceMemory?: number;
};

/** One-shot probe. Safe on the server (always false there). */
export function isLeanMedia(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as AdaptiveNavigator;
  const c = nav.connection;
  if (c?.saveData) return true;
  if (c?.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true;
  return false;
}

/**
 * Live probe — re-evaluates when the connection changes (e.g. wifi drops to
 * cellular). Starts false so server and first client paint agree.
 */
export function useLeanMedia(): boolean {
  const [lean, setLean] = useState(false);
  useEffect(() => {
    const update = () => setLean(isLeanMedia());
    update();
    const c = (navigator as AdaptiveNavigator).connection;
    c?.addEventListener?.("change", update);
    return () => c?.removeEventListener?.("change", update);
  }, []);
  return lean;
}
