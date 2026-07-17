import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "Nothing here",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-32 text-center">
      <div
        aria-hidden
        className="absolute inset-x-0 top-[24%] h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
      />
      <Eyebrow num="404">Beyond the shrine</Eyebrow>
      <h1 className="mt-7">
        <span className="block font-tamil text-4xl font-extrabold leading-tight text-sacred sm:text-6xl">
          இங்கு எதுவும் இல்லை
        </span>
        <span className="mt-4 block font-display text-2xl font-semibold text-sacred/90 sm:text-3xl">
          The dark holds nothing here
        </span>
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-sacred/60">
        The path you followed leads outside the sanctum. The guardian watches
        every threshold — let him see you back.
      </p>
      <div className="mt-10">
        <PillButton href="/" variant="solid">
          Return to the threshold
        </PillButton>
      </div>
    </section>
  );
}
