import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeliefTag } from "@/components/ui/BeliefTag";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "The Guardian",
  description:
    "Who is Karuppu Swamy — the meaning of the name, the kind of god he is, and the Nayaka-era origin of the guardian deity.",
};

const identity = [
  {
    tamil: "காவல் தெய்வம்",
    term: "Kaval Deivam",
    note: "Guardian deity — the protector stationed where the village meets the wild.",
  },
  {
    tamil: "கிராம தேவதை",
    term: "Gramadevata",
    note: "Village deity — bound to a place and its people, not to a temple hierarchy.",
  },
  {
    tamil: "குல தேவதை",
    term: "Kuladevata",
    note: "Ancestral deity — the family god, kept across generations.",
  },
  {
    tamil: "இருபத்தொன்று",
    term: "One of 21",
    note: "Among the twenty-one folk deities associated with Ayyanar.",
  },
];

const timeline = [
  {
    period: "Nayaka period · 16th–18th c.",
    title: "An age of warrior-chieftains",
    body: "Scholars link Karuppu's emergence to the Nayaka era, possibly modelled on the poligars — the local martial chieftains who guarded the land.",
    verify: true,
  },
  {
    period: "A protector, deified",
    title: "From man to guardian",
    body: "Devotees hold that he was a real historical protector who, in death, became a deity — his valour remembered as divine guardianship.",
    verify: true,
  },
  {
    period: "At the boundary",
    title: "Keeper of the threshold",
    body: "Stationed at the kāṭu — the wilderness edge of the village — he shields homes and communities from evil spirits and negative energy.",
  },
  {
    period: "Across the seas",
    title: "A guardian without borders",
    body: "Carried by Tamil migrants to Malaysia, Sri Lanka, the Caribbean and beyond, the village guardian became a deity worshipped across the world.",
  },
];

export default function GuardianPage() {
  return (
    <>
      {/* Hero — the guardian showcased as a zoomed greyscale still in the
          background; only the text sits on top, no frame. */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <Image
          src="/img/forms/periya.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[50%_56%] grayscale-[0.72] brightness-[0.68] contrast-[1.06]"
        />
        {/* Scrims — keep the text readable over the showcased still. */}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-void/55" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <Eyebrow num="01">The Guardian</Eyebrow>
              <SectionHeading
                as="h1"
                tamil="காவலன்"
                className="mt-5 text-4xl md:text-6xl"
              >
                Who is Karuppu Swamy
              </SectionHeading>
              <p className="mt-7 font-serif text-xl italic leading-relaxed text-sacred/85 md:text-2xl [text-shadow:0_2px_20px_rgba(0,0,0,0.95)]">
                A fierce protector, an upholder of justice, an enforcer of dharma
                — the dark god who guards the threshold and from whom no
                wrongdoer can hide.
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-sacred/70 [text-shadow:0_1px_16px_rgba(0,0,0,0.95)]">
                Karuppu — also Karuppasamy, Karuppannasamy — is one of the most
                widely worshipped guardian deities of Dravidian folk religion,
                honoured across Tamil Nadu, Kerala, Sri Lanka and a diaspora that
                spans the globe.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Name — pull quote */}
      <section className="border-y border-sacred/10 bg-stone/30">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <ScrollReveal>
            <Eyebrow num="·" className="justify-center">
              The Name
            </Eyebrow>
            <p className="mt-8 font-display text-3xl font-medium leading-tight text-sacred md:text-5xl md:leading-tight">
              <span className="text-accent">Karuppu</span>, the black.
              <br />
              <span className="text-accent">Sami</span>, the god.
            </p>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-sacred/60">
              “The Black God” — named for the dark form that absorbs and drives
              out darkness. The colour is not absence but power: the night that
              guards the sleeping village.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What kind of god */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ScrollReveal>
          <Eyebrow num="·">What kind of god</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            A guardian, a village god, an ancestor
          </SectionHeading>
        </ScrollReveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {identity.map((item, i) => (
            <ScrollReveal key={item.term} delay={i * 80}>
              <div className="h-full rounded-xl border border-sacred/10 bg-stone/40 p-6 transition-colors hover:border-accent/40">
                <p className="font-tamil text-lg text-sacred/70">{item.tamil}</p>
                <p className="mt-1 font-display text-xl font-semibold text-accent">
                  {item.term}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-sacred/60">
                  {item.note}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Origin timeline */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <ScrollReveal>
          <Eyebrow num="·">Origin</Eyebrow>
          <SectionHeading className="mt-5 max-w-2xl text-3xl md:text-5xl">
            From chieftain to deity
          </SectionHeading>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-sacred/50">
            The history is oral, not Sanskrit-textual — sung in villu paattu and
            folk ballad. Dates and origins below follow scholarship and are marked
            for verification. <BeliefTag kind="verify" />
          </p>
        </ScrollReveal>

        <ol className="mt-14 space-y-px">
          {timeline.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 90}>
              <li className="relative grid gap-2 border-l border-sacred/15 py-7 pl-8 md:grid-cols-[200px_1fr] md:gap-8">
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-9 h-2.5 w-2.5 rounded-full bg-accent"
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sacred/45">
                  {step.period}
                </p>
                <div>
                  <h3 className="font-display text-xl font-semibold text-sacred">
                    {step.title}
                    {step.verify && (
                      <>
                        {" "}
                        <BeliefTag kind="verify" />
                      </>
                    )}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-sacred/65">
                    {step.body}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-32 text-center">
        <ScrollReveal>
          <SectionHeading className="text-2xl md:text-4xl">
            See him revealed
          </SectionHeading>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <PillButton href="/forms" variant="solid">
              The Forms
            </PillButton>
            <PillButton href="/iconography">What he bears</PillButton>
            <PillButton href="/powers">His powers</PillButton>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
