import type { Metadata } from "next";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { sections } from "@/content/sections";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillButton } from "@/components/ui/PillButton";
import { RitualDivider } from "@/components/ui/RitualDivider";
import { Aruval, Vibhuti } from "@/components/icons";
import { IconCrest } from "@/components/iconography/IconCrest";
import {
  AttributeRow,
  type Attribute,
} from "@/components/iconography/AttributeRow";
import {
  FieryEye,
  WarriorBun,
  ChainGarland,
  HorseHound,
} from "@/components/iconography/glyphs";

const data = sections.iconography;

export const metadata: Metadata = { title: data.title, description: data.lead };

/**
 * Each attribute, paired with the glyph that draws it. Order + copy are canonical
 * (content/sections.ts); only the framing index + icon are chosen here. The
 * VERIFY marker on Horse & Hound is carried through from the source.
 */
const attrIcons: Record<string, Attribute["Icon"]> = {
  "The Aruval": Aruval,
  "Fiery Eyes": FieryEye,
  "The Warrior Bun": WarriorBun,
  "Ash & Kumkum": Vibhuti,
  "Chains & Garlands": ChainGarland,
  "Horse & Hound": HorseHound,
};

const attributes: Attribute[] = data.points.map((p, i) => ({
  index: String(i + 1).padStart(2, "0"),
  tamil: p.tamil,
  title: p.title,
  body: p.body,
  verify: p.verify,
  Icon: (attrIcons[p.title] ?? Aruval) as (
    props: SVGProps<SVGSVGElement>,
  ) => React.ReactElement,
}));

export default function IconographyPage() {
  return (
    <div>
      {/* Hero — the guardian showcased as a zoomed greyscale still in the
          background; only the text sits on top. */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <Image
          src="/img/forms/sangili.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[50%_56%] grayscale-[0.72] brightness-[0.68] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/75" />

        <IconCrest className="pointer-events-none absolute -right-8 top-1/2 hidden h-[72vh] max-h-[640px] w-[72vh] max-w-[640px] -translate-y-1/2 lg:block" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28">
          <ScrollReveal>
            <Eyebrow num={data.num}>{data.eyebrow}</Eyebrow>
            <SectionHeading
              as="h1"
              tamil={data.tamil}
              accent
              className="mt-6 max-w-3xl text-5xl md:text-7xl"
            >
              The Symbols He Bears
            </SectionHeading>
            <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/80 md:text-2xl">
              {data.lead}
            </p>
            <p className="mt-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-sacred/45">
              <span aria-hidden className="h-px w-10 bg-accent/60" />
              Fire and iron, read line by line
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pull line — the thesis of the reading */}
      <section className="border-y border-sacred/10 bg-stone/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <ScrollReveal>
            <p className="font-display text-2xl font-medium leading-tight text-sacred md:text-4xl md:leading-tight">
              Nothing he carries is ornament.
              <br />
              <span className="text-accent">
                Every blade and bead is a word.
              </span>
            </p>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-sacred/60">
              Sword and ash, eye and chain — taken together they spell the kind of
              god he is: a warrior-guardian, fierce and sacred.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The reading — alternating annotation rows down the figure */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-28">
        <ScrollReveal>
          <Eyebrow num="·">The Reading</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            Six marks of the guardian
          </SectionHeading>
        </ScrollReveal>

        {/* central spine the rows hang from on wide screens */}
        <div className="relative mt-16">
          <span
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-sacred/10 to-transparent md:block"
          />
          <ol className="space-y-16 md:space-y-20">
            {attributes.map((attribute, i) => (
              <ScrollReveal key={attribute.title} delay={i * 80}>
                <li>
                  <AttributeRow attribute={attribute} flip={i % 2 === 1} />
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <RitualDivider className="my-4" />

      {/* Surf onward */}
      <section className="mx-auto max-w-6xl px-6 py-24 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <PillButton href="/">Back to home</PillButton>
          <Link
            href="/worship"
            className="group flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-xl font-semibold text-sacred transition-colors group-hover:text-accent">
              Worship
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
