import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { forms, formById } from "@/services/karuppu";
import { MotionSlot } from "@/components/media/MotionSlot";
import { SanctumRoom } from "@/components/forms/SanctumRoom";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BeliefTag } from "@/components/ui/BeliefTag";
import { RitualDivider } from "@/components/ui/RitualDivider";

/**
 * A god's sanctum — his own statically-generated, code-split route (the
 * "microservice"), and since plan.md §14 his own ROOM: inside this route the
 * shrine's seam re-points to his colour and his weather fills the air.
 * Generated from the registry, so a new form needs no new file. Here the
 * figure is finally revealed; the hero MotionSlot is already wired for his
 * motion video the day one is added to the registry.
 */
export function generateStaticParams() {
  return forms.map((f) => ({ form: f.id }));
}

/** The roster is sealed at build time — an unknown door 404s without render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ form: string }>;
}): Promise<Metadata> {
  const { form } = await params;
  const f = formById(form);
  if (!f) return {};
  return {
    title: f.name,
    description: `${f.name} (${f.tamil}) — ${f.epithet}. ${f.description}`,
    openGraph: {
      title: `${f.name} — ${f.epithet}`,
      description: f.description,
      images: [
        {
          url: `/og/${f.id}.jpg`,
          width: 1200,
          height: 630,
          alt: `${f.name} (${f.tamil}) — ${f.epithet}`,
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function SanctumPage({
  params,
}: {
  params: Promise<{ form: string }>;
}) {
  const { form } = await params;
  const f = formById(form);
  if (!f) notFound();

  const idx = forms.findIndex((x) => x.id === f.id);
  const prev = forms[(idx - 1 + forms.length) % forms.length];
  const next = forms[(idx + 1) % forms.length];

  return (
    <SanctumRoom form={f}>
      {/* Hero — the reveal: his blurred presence resolves to a clear (B&W) still.
          The MotionSlot plays his video here the day the registry has one. */}
      <section className="relative flex min-h-dvh items-center overflow-hidden">
        <MotionSlot
          src={f.image}
          video={f.video}
          alt={`${f.name} — ${f.epithet}`}
          priority
          mediaClassName="grayscale"
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60" />
        </MotionSlot>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl">
            <Eyebrow num={f.num}>Kaval Deivam</Eyebrow>
            <h1 className="mt-5">
              <span className="block font-tamil text-5xl font-extrabold leading-none text-sacred drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] sm:text-7xl">
                {f.tamil}
              </span>
              <span className="mt-3 block font-display text-3xl font-semibold text-accent sm:text-5xl">
                {f.name}
              </span>
            </h1>
            <p className="mt-5 font-serif text-2xl italic text-sacred/85">
              {f.epithet}
              {f.verify && (
                <>
                  {" "}
                  <BeliefTag kind="verify" />
                </>
              )}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-sacred/50">
              {f.region}
            </p>
            <p className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80">
              <span aria-hidden className="inline-block h-px w-8 bg-accent/50" />
              The room of {f.theme.element}
            </p>
          </div>
        </div>
      </section>

      {/* Telling */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-serif text-xl leading-relaxed text-sacred/80 md:text-2xl md:leading-relaxed">
          {f.description}
        </p>

        {/* His three marks — who he is, in three held breaths. */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {f.aspects.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-sacred/10 bg-stone/40 p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                {a.title}
              </p>
              <p className="mt-3 font-serif text-base italic leading-snug text-sacred/70">
                {a.line}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-sacred/10 bg-stone/40 p-7">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            The remembered act
          </p>
          <p className="mt-3 font-serif text-lg italic leading-snug text-sacred/75 md:text-xl">
            {f.act}
          </p>
        </div>
      </section>

      <RitualDivider />

      {/* Move between fires — each neighbouring door already glows with ITS
          god's colour, a glimpse of the next room before the crossing. */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/forms/${prev.id}`}
            style={{ "--accent": prev.theme.accent } as CSSProperties}
            className="group flex flex-col text-left"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              ← Previous
            </span>
            <span className="mt-1 font-display text-lg font-semibold text-sacred transition-colors group-hover:text-accent">
              {prev.name}
            </span>
          </Link>
          <Link
            href="/"
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/50 transition-colors hover:text-accent"
          >
            Home
          </Link>
          <Link
            href={`/forms/${next.id}`}
            style={{ "--accent": next.theme.accent } as CSSProperties}
            className="group flex flex-col text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/40">
              Next →
            </span>
            <span className="mt-1 font-display text-lg font-semibold text-sacred transition-colors group-hover:text-accent">
              {next.name}
            </span>
          </Link>
        </div>
      </section>
    </SanctumRoom>
  );
}
