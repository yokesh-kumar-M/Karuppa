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
import {
  Aruval,
  Vibhuti,
  Lamp,
  KolamStar,
  FlameMandala,
} from "@/components/icons";
import { PowerSigil } from "@/components/powers/PowerSigil";
import { PowerCard, type Power } from "@/components/powers/PowerCard";

const data = sections.powers;

export const metadata: Metadata = { title: data.title, description: data.lead };

/**
 * The all-seeing eye of justice — a small bespoke glyph (not in the shared icon
 * set) for the power of நீதி, the unsleeping gaze from which no wrongdoer hides.
 */
function JusticeEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 12C5 7.5 8.4 5.3 12 5.3S19 7.5 21.5 12C19 16.5 15.6 18.7 12 18.7S5 16.5 2.5 12Z" />
      <circle cx="12" cy="12" r="3.1" />
      <circle cx="12" cy="12" r="1.1" fill="var(--color-fire)" stroke="none" />
    </svg>
  );
}

/**
 * A clenched fist / mace of valour for வீரம் — fearless martial force.
 */
function ValourFist(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 21v-5.5" />
      <path d="M7 15.5c0-3 .8-4.4 2.4-5.6" />
      <path d="M14 21l1.6-6.8c.5-2.1-.1-3.6-1.7-4.6" />
      <path d="M9.2 9.6c.4-1.7 1.6-3 3.3-3.6l4.2-1.4c1.2-.4 2 .9 1.2 1.9l-2.2 2.6" />
      <path d="M9.4 10.2c1.7-.6 3.4-.5 5 .3" />
    </svg>
  );
}

/** A boon-bestowing open palm (abhaya) for வரம் — the granting of grace. */
function BoonHand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21v-7" />
      <path d="M9 14c0-4 .3-6.2.3-8.4 0-1.1 1.6-1.1 1.6 0V12" />
      <path d="M10.9 11.6V4.4c0-1.1 1.6-1.1 1.6 0v7.2" />
      <path d="M12.5 11.8V5.6c0-1.1 1.6-1.1 1.6 0V13" />
      <path d="M14.1 12.4c.3-1.6 2-2.2 2.7-1l-1 3.6c-.6 2.1-2.3 3-4.4 3H9" />
      <circle cx="11" cy="8.4" r="1.1" fill="var(--color-fire)" stroke="none" />
    </svg>
  );
}

/**
 * The six powers, paired with the glyph that best carries each. Order and copy
 * are canonical (content/sections.ts); only the framing numerals + icons here.
 */
const powerIcons: Record<string, Power["Icon"]> = {
  Guardianship: KolamStar,
  "Justice & Retribution": JusticeEye,
  "Against Black Magic": Vibhuti,
  "The Oracle's Voice": (p) => <Lamp lit {...p} />,
  "Boon-Granting": BoonHand,
  "Strength & Valour": ValourFist,
};

const powers: Power[] = data.points.map((p, i) => ({
  num: String(i + 1).padStart(2, "0"),
  tamil: p.tamil ?? "",
  title: p.title,
  body: p.body,
  Icon: powerIcons[p.title] ?? Aruval,
}));

export default function PowersPage() {
  return (
    <div>
      {/* Hero — the guardian showcased as a zoomed greyscale still in the
          background; only the text sits on top. */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <Image
          src="/img/forms/vettai.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[50%_56%] grayscale-[0.72] brightness-[0.68] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/70" />

        <PowerSigil className="pointer-events-none absolute -right-10 top-1/2 hidden h-[70vh] max-h-[620px] w-[70vh] max-w-[620px] -translate-y-1/2 md:block" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28">
          <ScrollReveal>
            <Eyebrow num={data.num}>{data.eyebrow}</Eyebrow>
            <SectionHeading
              as="h1"
              tamil={data.tamil}
              accent
              className="mt-6 max-w-3xl text-5xl md:text-7xl"
            >
              Powers &amp; Abilities
            </SectionHeading>
            <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/80 md:text-2xl">
              {data.lead}
            </p>
            <p className="mt-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-sacred/45">
              <span aria-hidden className="h-px w-10 bg-accent/60" />
              Six fires of the guardian
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Litany — a sweeping serif line that frames the powers as devotion */}
      <section className="border-y border-sacred/10 bg-stone/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <ScrollReveal>
            <FlameMandala
              aria-hidden
              rays={20}
              className="mx-auto mb-8 h-12 w-12 text-accent/60"
            />
            <p className="font-display text-2xl font-medium leading-tight text-sacred md:text-4xl md:leading-tight">
              He does not bless from a distance.
              <br />
              <span className="text-accent">He guards, he judges, he answers.</span>
            </p>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-sacred/60">
              What follows are not feats fixed in scripture but the attributes his
              people have always known him by — named here as devotees name them.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The six powers — an arresting numbered, iconographic grid */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <ScrollReveal>
          <Eyebrow num="·">The Six</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            Read his power like a litany
          </SectionHeading>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {powers.map((power, i) => (
            <ScrollReveal key={power.title} delay={i * 90}>
              <PowerCard power={power} />
            </ScrollReveal>
          ))}
        </div>

        {data.note && (
          <ScrollReveal>
            <p className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              <BeliefTag kind="belief" /> {data.note}
            </p>
          </ScrollReveal>
        )}
      </section>

      <RitualDivider className="my-4" />

      {/* Surf onward */}
      <section className="mx-auto max-w-6xl px-6 py-24 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <PillButton href="/">Back to home</PillButton>
          <Link
            href="/iconography"
            className="group flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-xl font-semibold text-sacred transition-colors group-hover:text-accent">
              Iconography
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
