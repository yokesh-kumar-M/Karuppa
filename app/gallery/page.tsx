import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { forms } from "@/services/karuppu";
import { sections } from "@/content/sections";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillButton } from "@/components/ui/PillButton";
import { RitualDivider } from "@/components/ui/RitualDivider";
import { FlameMandala } from "@/components/icons";
import { BlurredStill } from "@/components/gallery/BlurredStill";
import { HallNote } from "@/components/gallery/HallNote";

const data = sections.gallery;

export const metadata: Metadata = {
  title: data.title,
  description:
    "A veiled gallery of six forms. Follow each shadow into its own sanctum to see the full artistic study.",
};

/**
 * The Hall of Motion (gallery) — a bespoke dark chapter. The gods are NOT shown
 * clearly here: each form is a heavily blurred, darkened still that links to his
 * own page, where the portrait is revealed. The motion (scroll-scrubbed clips of
 * each divine act) will live here later; every tile already reserves its slot.
 * No colour: the tiles read as one deity, told only in blur, ash text, and motion.
 */
export default function GalleryPage() {
  return (
    <>
      {/* Hero — the guardian showcased as a zoomed greyscale still in the
          background; only the text sits on top. */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <Image
          src="/img/forms/periya.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[50%_56%] grayscale-[0.72] brightness-[0.68] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/70" />
        <FlameMandala
          aria-hidden
          className="slow-spin pointer-events-none absolute -right-16 top-1/2 h-[62vh] max-h-[560px] w-[62vh] max-w-[560px] -translate-y-1/2 text-accent opacity-[0.06]"
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-28">
          <Eyebrow num={data.num}>{data.eyebrow}</Eyebrow>
          <SectionHeading
            as="h1"
            tamil={data.tamil}
            accent
            className="mt-6 text-5xl md:text-7xl"
          >
            {data.title}
          </SectionHeading>
          <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/75 md:text-2xl">
            The forms of Karuppu, gathered in one dark hall. Each remains veiled
            here; follow a shadow into its own sanctum to see the full study.
          </p>
        </div>
      </section>

      {/* The three plain truths of the hall */}
      <section className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <Eyebrow num="·">How the hall works</Eyebrow>
        </ScrollReveal>
        <div className="mt-8">
          <HallNote />
        </div>
      </section>

      <RitualDivider className="my-16 md:my-20" />

      {/* The six fires — blurred stills, no legible faces */}
      <section className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <Eyebrow num="·">The fires</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            Six forms, kept in shadow
          </SectionHeading>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-sacred/55">
            The stills below are blurred and darkened on purpose. Open one to
            see the god clearly on his own page.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form, i) => (
            <ScrollReveal key={form.id} delay={i * 70}>
              <BlurredStill form={form} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* The 108 — tradition speaks of more */}
      <section className="mx-auto max-w-3xl px-6 pt-24 text-center">
        <ScrollReveal>
          <div className="relative mx-auto grid place-items-center">
            <FlameMandala
              aria-hidden
              className="slow-spin h-28 w-28 text-accent/30"
            />
            <span className="absolute font-display text-lg font-semibold text-sacred/45">
              108
            </span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-sacred/55">
            Six forms are gathered here. Devotional tradition remembers the
            guardian through many more names and local forms.
          </p>
        </ScrollReveal>
      </section>

      <RitualDivider className="my-16 md:my-20" />

      {/* Footer — back home + next chapter */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <PillButton href="/">Back to home</PillButton>
          <Link href="/about" className="group flex flex-col items-end text-right">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-xl font-semibold text-sacred transition-colors group-hover:text-accent">
              About
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
