"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The sanctum's own boundary — a fault inside one room never darkens the
 * shrine. The nav, footer and every other route stay lit; only this door
 * offers to be kindled again.
 */
export default function SanctumError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the failure for debugging — the page itself stays reverent.
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-32 text-center">
      <Eyebrow num="!">The fire faltered</Eyebrow>
      <h1 className="mt-7">
        <span className="block font-tamil text-4xl font-extrabold leading-tight text-sacred sm:text-5xl">
          தீ தடுமாறியது
        </span>
        <span className="mt-4 block font-display text-2xl font-semibold text-sacred/90 sm:text-3xl">
          This sanctum would not light
        </span>
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-sacred/60">
        An error interrupted this room alone — the rest of the shrine still
        burns. Kindle the door again, or step back out.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-void shadow-[0_0_24px_var(--glow)] transition-all duration-300 hover:bg-accent/90"
        >
          Kindle again
        </button>
        <Link
          href="/forms"
          className="inline-flex items-center gap-2 rounded-full border border-sacred/25 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-sacred/90 transition-all duration-300 hover:border-accent hover:text-accent"
        >
          All forms
        </Link>
      </div>
    </section>
  );
}
