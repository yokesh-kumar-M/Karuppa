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
import { Lamp } from "@/components/icons";
import { OraclePanel } from "@/components/worship/OraclePanel";
import { OfferingsLedger } from "@/components/worship/OfferingsLedger";

const data = sections.worship;

export const metadata: Metadata = { title: data.title, description: data.lead };

/**
 * Worship — "Rituals & the Oracle". A bespoke dark chapter on a folk, oral,
 * non-Vedic worship: hereditary priesthood, folk-art history, offerings, and —
 * as the dramatic centerpiece — the lamp-lit Oracle (சாமி ஆடுதல்). Monochrome:
 * no colour identity — only ash text, blur, and the lamp's light.
 */

/** The two hereditary, oral pillars before the Oracle descends. */
const keepers = [
  {
    tamil: "பூசாரி",
    term: "The Priesthood",
    body: "His priests are not Brahmin and his rite is not Agamic. The office passes by blood — a hereditary, local lineage that has kept him for generations, outside the Vedic order entirely.",
    mark: "Hereditary · non-Brahmin",
  },
  {
    tamil: "வில்லுப்பாட்டு",
    term: "The Folk Arts",
    body: "His history is not written but performed — sung in villu paattu, danced in karakattam, played out in koothu and carried in the oral ballads of the village.",
    mark: "Sung, not scripted",
  },
];

export default function WorshipPage() {
  return (
    <div>
      {/* Hero — the guardian showcased as a zoomed greyscale still in the
          background; only the text sits on top. */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden">
        <Image
          src="/img/forms/mangadu.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[50%_56%] grayscale-[0.72] brightness-[0.68] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/65" />
        <Lamp
          lit
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[40vh] max-h-[360px] w-auto -translate-y-1/2 text-sacred opacity-[0.10] md:block"
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
          <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/80 md:text-2xl">
            {data.lead}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sacred/55">
            There is no book to open here. His worship lives in voices, in
            hands, in the lamp passed down a family line — and once a year, in a
            body the god enters to speak for himself.
          </p>
        </div>
      </section>

      {/* The keepers — priesthood + folk arts */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <ScrollReveal>
          <Eyebrow num="·">How he is kept</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            Sung in the blood, not the book
          </SectionHeading>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {keepers.map((k, i) => (
            <ScrollReveal key={k.term} delay={i * 110}>
              <div className="h-full rounded-2xl border border-sacred/10 bg-stone/40 p-7 transition-colors hover:border-accent/40">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  {k.mark}
                </p>
                <p className="mt-4 font-tamil text-lg text-sacred/65">
                  {k.tamil}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-sacred">
                  {k.term}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-sacred/65">
                  {k.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Offerings — gentle vs fierce, factual + respectful */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <ScrollReveal>
          <Eyebrow num="·">What is brought to him</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            Offerings
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-sacred/60">
            From light and fragrance to the fiercer gifts of a guardian — the
            range of his offerings, set down plainly.
          </p>
        </ScrollReveal>
        <div className="mt-12">
          <OfferingsLedger />
        </div>
      </section>

      <RitualDivider className="my-4" />

      {/* The Oracle — the dramatic centerpiece */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <Eyebrow num="·" className="justify-center">
              The god descends
            </Eyebrow>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <OraclePanel />
        </ScrollReveal>
      </section>

      {/* Surf onward */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <PillButton href="/">Back to home</PillButton>
          <Link
            href="/festivals"
            className="group flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-xl font-semibold text-sacred transition-colors group-hover:text-accent">
              Festivals
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
