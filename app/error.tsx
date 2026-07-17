"use client";

import { useEffect } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function Error({
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
      <Eyebrow num="!">The vigil faltered</Eyebrow>
      <h1 className="mt-7">
        <span className="block font-tamil text-4xl font-extrabold leading-tight text-sacred sm:text-5xl">
          ஒரு தடை
        </span>
        <span className="mt-4 block font-display text-2xl font-semibold text-sacred/90 sm:text-3xl">
          Something broke the stillness
        </span>
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-sacred/60">
        An error interrupted this chapter. Light the lamp again — if the dark
        persists, return to the threshold.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-void shadow-[0_0_24px_rgba(255,24,20,0.18)] transition-all duration-300 hover:bg-accent/90"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-sacred/25 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-sacred/90 transition-all duration-300 hover:border-accent hover:text-accent"
        >
          The threshold
        </a>
      </div>
    </section>
  );
}
