import type { Metadata } from "next";
import Link from "next/link";
import { sections } from "@/content/sections";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeliefTag } from "@/components/ui/BeliefTag";
import { PillButton } from "@/components/ui/PillButton";
import { RitualDivider } from "@/components/ui/RitualDivider";
import { AtlasField } from "@/components/temples/AtlasField";
import { ShrineCompass } from "@/components/temples/ShrineCompass";
import { ShrineCard, type Shrine } from "@/components/temples/ShrineCard";

const data = sections.temples;

export const metadata: Metadata = { title: data.title, description: data.lead };

/**
 * Temples — "Shrines of the Guardian." A bespoke, dark atlas chapter: no real
 * map (no libraries, no faked coordinates), but a stylized shrine-registry — the
 * original shrine given primacy, the rest indexed beneath a faint constellation
 * that only hints at the map-to-come. All facts flow from sections.temples; the
 * two VERIFY markers (Azhagar Koil, Sabarimala) are preserved.
 */

// The original — rendered apart, with primacy.
const source: Shrine = {
  index: "I",
  place: "Azhagar Koil",
  tamil: "அழகர் கோயில்",
  region: "Madurai · Tamil Nadu",
  note: "Considered the original shrine — other temples are said to take their soil from here, carrying the source out to wherever the guardian is raised anew.",
  verify: true,
  primary: true,
};

// Those that took its soil — the registry beneath the source.
const shrines: Shrine[] = [
  {
    index: "II",
    place: "Mettukulam",
    region: "Coimbatore · Tamil Nadu",
    note: "A temple dedicated solely to Karuppu — the guardian kept as the single, undivided focus of worship.",
  },
  {
    index: "III",
    place: "Tiruverkadu",
    region: "Chennai · Tamil Nadu",
    note: "Honoured alongside Bhadrakali and Shiva — the guardian standing within a wider sacred company.",
  },
  {
    index: "IV",
    place: "Thirumalaiyam Palayam",
    region: "Salem · Tamil Nadu",
    note: "A regional shrine of the guardian, kept by the people of the land around it.",
  },
  {
    index: "V",
    place: "Sabarimala",
    region: "Across the seas of hills · Kerala",
    note: "Cited in popular sources as a guardian of the premises — recorded here, but still to be confirmed against temple sources.",
    verify: true,
  },
];

export default function TemplesPage() {
  return (
    <>
      {/* Hero — atlas backdrop + map-rose emblem */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden">
        <AtlasField className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-void/40 to-void" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-28 md:grid-cols-[1fr_auto] md:gap-16">
          <ScrollReveal>
            <Eyebrow num={data.num}>{data.eyebrow}</Eyebrow>
            <SectionHeading
              as="h1"
              tamil={data.tamil}
              accent
              className="mt-6 text-5xl md:text-7xl"
            >
              Shrines of the Guardian
            </SectionHeading>
            <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/75 md:text-2xl">
              From the hills near Madurai to shrines across the seas — one
              guardian, raised in many grounds.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-sacred/60">
              An editorial atlas of the principal shrines: the remembered
              source, and the grounds said to have carried its soil onward.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <ShrineCompass className="mx-auto h-56 w-56 md:h-72 md:w-72" />
          </ScrollReveal>
        </div>
      </section>

      {/* The Source — the original shrine, given primacy */}
      <section className="mx-auto max-w-6xl px-6 pt-8">
        <ScrollReveal>
          <Eyebrow num="·">The Registry</Eyebrow>
          <SectionHeading className="mt-5 max-w-3xl text-3xl md:text-5xl">
            The source, and those that took its soil
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-sacred/50">
            The atlas is oral and devotional, not surveyed — places are marked as
            tradition keeps them, and claims awaiting confirmation are flagged.{" "}
            <BeliefTag kind="verify" />
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-12">
          <ShrineCard shrine={source} />
        </ScrollReveal>
      </section>

      {/* The Registry — the shrines that followed */}
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {shrines.map((shrine, i) => (
            <ScrollReveal key={shrine.place} delay={i * 90}>
              <ShrineCard shrine={shrine} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
            <BeliefTag kind="belief" /> An indicative devotional atlas — locations
            and origin claims remain marked for temple-source review.
          </p>
        </ScrollReveal>
      </section>

      <RitualDivider className="my-16" />

      {/* Surf onward — Return + Next (Diaspora) */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <PillButton href="/">Back to home</PillButton>
          <Link
            href="/diaspora"
            className="group flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-xl font-semibold text-sacred transition-colors group-hover:text-accent">
              Diaspora
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
