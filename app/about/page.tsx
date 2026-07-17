import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sections } from "@/content/sections";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillButton } from "@/components/ui/PillButton";
import { RitualDivider } from "@/components/ui/RitualDivider";
import { BeliefTag } from "@/components/ui/BeliefTag";
import { MarkerKey } from "@/components/about/MarkerKey";
import { VerifyList } from "@/components/about/VerifyList";

const data = sections.about;

export const metadata: Metadata = {
  title: data.title,
  description:
    "How this shrine tells a living faith honestly — the belief and verify markers, the sources, the cinematic inspiration, and what is still to be confirmed.",
};

const sources = [
  {
    title: "Folk-religion scholarship",
    body: "Academic work on Tamil and Dravidian folk religion — the guardian deities, the Ayyanar circle, and village worship.",
  },
  {
    title: "Devotional accounts",
    body: "What devotees say and sing. We treat these as belief wherever they reach beyond what scholarship can confirm.",
  },
  {
    title: "Oral tradition",
    body: "His history is sung, not written in Sanskrit — villu paattu and folk ballad. We name it as oral, and tag what we cannot yet check.",
  },
];

/**
 * Sources & Disclaimer (about) — the honesty page. Deliberately the calmest
 * chapter on the site: no ember field, no purple prose. It explains the belief
 * vs verify system with real examples, names the sources and inspiration
 * plainly, and lists what is still to be confirmed. This page earns trust.
 */
export default function AboutPage() {
  return (
    <>
      {/* Hero — the guardian showcased in the background; about stays calm. */}
      <section className="relative overflow-hidden border-b border-sacred/10">
        <Image
          src="/img/forms/periya.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[50%_54%] grayscale-[0.78] brightness-[0.6] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/70" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-32 md:pb-20 md:pt-40">
          <ScrollReveal>
            <Eyebrow num={data.num}>{data.eyebrow}</Eyebrow>
            <SectionHeading
              as="h1"
              tamil={data.tamil}
              className="mt-6 text-4xl md:text-6xl"
            >
              {data.title}
            </SectionHeading>
            <p className="mt-7 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/80 md:text-2xl">
              This is a living faith, told with honesty. We keep devotional
              belief separate from what can be verified, so what you read stays
              both faithful and true.
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-sacred/55">
              <span className="inline-flex items-center gap-2">
                <BeliefTag kind="belief" /> devotional tradition
              </span>
              <span aria-hidden className="text-sacred/20">·</span>
              <span className="inline-flex items-center gap-2">
                <BeliefTag kind="verify" /> still to confirm
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Belief vs Fact — the key, with real examples */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <Eyebrow num="·">Belief vs fact</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            Two markers, used throughout
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-sacred/65">
            Wherever a claim is devotional, or not yet confirmed, we mark it. You
            will see these two tags across every chapter, so you always know what
            is settled and what is held in faith.
          </p>
        </ScrollReveal>
        <div className="mt-12">
          <MarkerKey />
        </div>
      </section>

      <RitualDivider className="my-4" />

      {/* Sources */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <Eyebrow num="·">Sources</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            Where this comes from
          </SectionHeading>
        </ScrollReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {sources.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-sacred/10 bg-stone/40 p-6">
                <h3 className="font-display text-lg font-semibold text-sacred">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sacred/65">
                  {s.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <RitualDivider className="my-4" />

      {/* Inspiration */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <Eyebrow num="·">Inspiration</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            The cinematic concept
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-sacred/70">
            The dark, cinematic feel of this shrine draws on two Tamil films —
            <span className="text-sacred"> Anniyan</span> (2005) and
            <span className="text-sacred"> Karuppu</span> (2026). We borrow their
            gravitas and their black-and-fire mood, never their violence. The
            faith itself is real and is treated with respect; the films only
            shape how it is presented.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-sacred/10 bg-stone/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/90">
                Film · 2005
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-sacred">
                Anniyan
              </p>
              <p className="mt-3 text-sm leading-relaxed text-sacred/65">
                For its theme of justice and dharma — the punishing of
                wrongdoing — which echoes the guardian's own nature.
              </p>
            </div>
            <div className="rounded-2xl border border-sacred/10 bg-stone/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/90">
                Film · 2026
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-sacred">
                Karuppu
              </p>
              <p className="mt-3 text-sm leading-relaxed text-sacred/65">
                For its black-and-fire key art and its reverence for the
                guardian — the visual mood this shrine is built in.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <RitualDivider className="my-4" />

      {/* Still to verify */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <Eyebrow num="·">Still to verify</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            What we have not yet confirmed
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-sacred/65">
            These claims are flagged across the site and stay marked until we can
            check them against a primary or temple source.
          </p>
        </ScrollReveal>
        <VerifyList />
      </section>

      <RitualDivider className="my-4" />

      {/* Footer — back home + next chapter */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <PillButton href="/">Back to home</PillButton>
          <Link
            href="/guardian"
            className="group flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-xl font-semibold text-sacred transition-colors group-hover:text-accent">
              Guardian
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
