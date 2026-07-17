import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sections } from "@/content/sections";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeliefTag } from "@/components/ui/BeliefTag";
import { PillButton } from "@/components/ui/PillButton";
import { RitualDivider } from "@/components/ui/RitualDivider";
import { Vel, Lamp, FlameMandala, Aruval } from "@/components/icons";
import { RiteTimeline, type RiteStage } from "@/components/festivals/RiteTimeline";

const data = sections.festivals;

export const metadata: Metadata = { title: data.title, description: data.lead };

/**
 * Festivals — "The Annual Rite". A bespoke dark chapter staged as a single rite
 * unfolding from first light to the night fire: flag, days, trance, fire &
 * procession. Monochrome: no colour identity — only ash text, blur, and motion.
 * VERIFY markers on "Three Days" and "Fire & Procession" are preserved.
 */
const stages: RiteStage[] = [
  {
    phase: "First light · the opening",
    tamil: "கொடியேற்றம்",
    title: "Flag Hoisting",
    body: "The festival opens with the raising of the flag. The cloth climbs the pole and the call goes out — the god is summoned down to the ground, and for these days the village is his.",
    icon: <Vel className="h-4 w-4" />,
  },
  {
    phase: "The days · turned inward",
    title: "Three Days",
    body: "Typically the rite runs three days, through which the villagers keep within the village — the world held at the boundary while the god is present among them.",
    verify: true,
    icon: <Lamp lit className="h-4 w-4" />,
  },
  {
    phase: "The reckoning · the god speaks",
    tamil: "அருள்வாக்கு",
    title: "The Trance",
    body: "The oracle enters trance and the god speaks through him. Grievances are heard, the guilty are named, disputes are settled and vows received — his word, given in the open, is binding.",
    icon: <FlameMandala rays={8} className="h-4 w-4" />,
  },
  {
    phase: "Nightfall · fire & procession",
    title: "Fire & Procession",
    body: "It ends in fire. Devotees walk the theemithi coals, the aruval rites are kept, and the god is carried out in night procession to the hard beat of the parai drum.",
    verify: true,
    icon: <Aruval className="h-4 w-4" />,
  },
];

export default function FestivalsPage() {
  return (
    <div>
      {/* Hero — the guardian showcased as a zoomed greyscale still in the
          background; only the text sits on top. */}
      <section className="relative flex min-h-[78vh] items-center overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/img/forms/vettai.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="kenburns object-cover object-[50%_56%] grayscale-[0.72] brightness-[0.68] contrast-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent" />
        </div>
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
          <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/85 md:text-2xl">
            {data.lead}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sacred/60">
            For the rest of the year he keeps the boundary in silence. For these
            few days, the boundary closes, the drum starts, and the whole
            village turns to face him.
          </p>
        </div>
      </section>

      {/* The rite, unfolding dawn to night */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <ScrollReveal>
          <Eyebrow num="·">From first light to the fire</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            The rite unfolds
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-sacred/60">
            One sequence, kept each year — the flag calls him, the days hold him,
            the oracle gives his voice, and the night gives him fire.
          </p>
        </ScrollReveal>

        <div className="mt-14">
          <RiteTimeline stages={stages} />
        </div>
      </section>

      <RitualDivider className="my-4" />

      {/* The fire — closing register */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <ScrollReveal>
            <Eyebrow num="·">The night fire</Eyebrow>
            <SectionHeading className="mt-5 text-3xl md:text-5xl">
              Walked on coals,
              <br />
              carried to the drum
            </SectionHeading>
            <p className="mt-7 font-serif text-xl italic leading-relaxed text-sacred/80 md:text-2xl">
              தீமிதி — the fire-walk. Faith proven on the coals, the aruval
              kept, and the god borne through the dark to the beat of the parai.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sacred/60">
              This is where the rite burns hottest and the village ends its
              year-long vigil — the guardian, for one night, walking openly
              among his own. <BeliefTag kind="verify" />
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="relative grid place-items-center py-10">
              <FlameMandala
                aria-hidden
                rays={24}
                className="slow-spin relative h-56 w-56 text-accent opacity-90 md:h-64 md:w-64"
                style={{
                  filter:
                    "drop-shadow(0 0 30px color-mix(in srgb, var(--glow) 55%, transparent))",
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Surf onward */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <PillButton href="/">Back to home</PillButton>
          <Link
            href="/temples"
            className="group flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-xl font-semibold text-sacred transition-colors group-hover:text-accent">
              Temples
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
