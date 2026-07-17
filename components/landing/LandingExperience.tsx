"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FormId, KaruppuForm } from "@/services/karuppu";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillButton } from "@/components/ui/PillButton";
import { KaruppuWordmark } from "@/components/brand/KaruppuWordmark";
import { Aruval, KeyArtCrest, Lamp, Vel } from "@/components/icons";
import { cn } from "@/lib/cn";

const principles = [
  {
    num: "01",
    title: "Justice",
    tamil: "நீதி",
    body: "The oath that holds a community together, and the watch that answers when it is broken.",
    icon: Aruval,
  },
  {
    num: "02",
    title: "Protection",
    tamil: "காவல்",
    body: "A guardian placed at the edge — where the village meets the unknown beyond it.",
    icon: Vel,
  },
  {
    num: "03",
    title: "Living faith",
    tamil: "வழிபாடு",
    body: "Remembered through shrines, festivals, oral histories and families across generations.",
    icon: Lamp,
  },
];

const journeys = [
  {
    href: "/guardian",
    label: "The story",
    title: "Meet the guardian",
    body: "Begin with the name, the threshold and the communities that keep his memory alive.",
    image: "/img/veil/periya.webp",
    eyebrow: "Who is Karuppu?",
  },
  {
    href: "/worship",
    label: "Living practice",
    title: "Ritual, oath & oracle",
    body: "Enter the devotional world of offerings, village counsel and the sacred promise.",
    image: "/img/veil/mangadu.webp",
    eyebrow: "How worship lives",
  },
  {
    href: "/diaspora",
    label: "Across waters",
    title: "A guardian without borders",
    body: "Follow the tradition from Tamil villages to shrines and families across the seas.",
    image: "/img/veil/sangani.webp",
    eyebrow: "The global journey",
  },
];

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

function MobileFormCard({ form }: { form: KaruppuForm }) {
  return (
    <Link
      href={`/forms/${form.id}`}
      style={
        {
          "--form-accent": form.theme.accent,
          "--form-glow": form.theme.glow,
        } as CSSProperties
      }
      className="group relative isolate min-h-[31rem] overflow-hidden border border-sacred/12 bg-stone outline-none focus-visible:ring-2 focus-visible:ring-[var(--form-accent)]"
    >
      <Image
        src={form.image}
        alt=""
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover object-top grayscale-[0.72] saturate-[0.7] transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-[0.45]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/28 to-void/20" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <span className="font-mono text-[10px] tracking-[0.28em] text-sacred/70">
          {form.num}
        </span>
        <span className="border border-sacred/15 bg-void/45 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-sacred/62 backdrop-blur-md">
          {form.theme.element}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span lang="ta" className="font-tamil text-base text-sacred/62">{form.tamil}</span>
        <h3 className="mt-1 font-serif text-3xl font-medium leading-none text-sacred">
          {form.name}
        </h3>
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-sacred/16 pt-4">
          <p className="text-sm text-sacred/65">{form.epithet}</p>
          <span
            aria-hidden
            className="text-xl text-[var(--form-accent)] transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function FormsAtlas({ forms }: { forms: KaruppuForm[] }) {
  const [activeId, setActiveId] = useState<FormId>(forms[0].id);
  const active = forms.find((form) => form.id === activeId) ?? forms[0];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {forms.map((form) => (
          <MobileFormCard key={form.id} form={form} />
        ))}
      </div>

      <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)] xl:gap-16">
        <div className="sticky top-24 h-[calc(100svh-7.5rem)] min-h-[38rem]">
          <div className="relative h-full overflow-hidden border border-sacred/12 bg-stone">
            {forms.map((form) => (
            <Image
              key={form.id}
              src={form.image}
              alt={activeId === form.id ? `${form.name} — ${form.epithet}` : ""}
              fill
              sizes="58vw"
              priority={form.id === forms[0].id}
              className={cn(
                "object-cover object-top grayscale-[0.68] saturate-[0.72] transition-all duration-700 ease-out",
                activeId === form.id
                  ? "scale-100 opacity-100"
                  : "scale-[1.025] opacity-0"
              )}
            />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/22" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void/45 to-transparent" />
            <div
              className="absolute inset-x-0 bottom-0 h-px transition-colors duration-500"
              style={{ backgroundColor: active.theme.accent }}
            />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sacred/62">
                Room {active.num}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sacred/62">
                Element · {active.theme.element}
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 xl:p-10">
              <p lang="ta" className="font-tamil text-lg text-sacred/62">{active.tamil}</p>
              <h3 className="mt-1 max-w-xl font-serif text-5xl font-medium leading-[0.94] text-sacred xl:text-6xl">
                {active.name}
              </h3>
              <div className="mt-6 flex items-end justify-between gap-8 border-t border-sacred/18 pt-5">
                <div>
                  <p className="text-base text-sacred/72">{active.epithet}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-sacred/45">
                    {active.region}
                  </p>
                </div>
                <Link
                  href={`/forms/${active.id}`}
                  className="shrink-0 border-b border-sacred/40 pb-1 text-xs uppercase tracking-[0.18em] text-sacred outline-none transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Enter sanctum ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ol className="border-t border-sacred/14">
          {forms.map((form) => {
            const selected = form.id === activeId;
            return (
              <li key={form.id}>
                <Link
                  href={`/forms/${form.id}`}
                  onMouseEnter={() => setActiveId(form.id)}
                  onFocus={() => setActiveId(form.id)}
                  style={
                    {
                      "--form-accent": form.theme.accent,
                      background: selected
                        ? `linear-gradient(90deg, color-mix(in srgb, ${form.theme.accent} 8%, transparent), transparent 72%)`
                        : undefined,
                    } as CSSProperties
                  }
                  className="group grid min-h-28 grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-sacred/14 px-2 py-5 outline-none transition-colors hover:bg-sacred/[0.035] focus-visible:ring-2 focus-visible:ring-[var(--form-accent)] xl:min-h-32 xl:px-4"
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[0.28em] transition-colors",
                      selected ? "text-[var(--form-accent)]" : "text-sacred/38"
                    )}
                  >
                    {form.num}
                  </span>
                  <span>
                    <span lang="ta" className="block font-tamil text-sm text-sacred/48">
                      {form.tamil}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block font-serif text-2xl transition-colors xl:text-3xl",
                        selected ? "text-sacred" : "text-sacred/68"
                      )}
                    >
                      {form.name}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "text-xl transition-all group-hover:translate-x-1",
                      selected ? "text-[var(--form-accent)]" : "text-sacred/25"
                    )}
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

function JourneyCard({ journey, index }: { journey: (typeof journeys)[number]; index: number }) {
  return (
    <Link
      href={journey.href}
      className={cn(
        "group relative isolate block h-full min-h-[28rem] overflow-hidden border border-sacred/12 bg-stone outline-none focus-visible:ring-2 focus-visible:ring-accent",
        index === 0 && "lg:col-span-6",
        index === 1 && "lg:col-span-3",
        index === 2 && "lg:col-span-3"
      )}
    >
      <Image
        src={journey.image}
        alt=""
        fill
        sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
        className="scale-[1.14] object-cover blur-[5px] grayscale brightness-[0.65] transition-all duration-700 group-hover:scale-[1.08] group-hover:brightness-[0.8]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/36 to-void/22" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-sacred/58">
          0{index + 1} · {journey.label}
        </span>
        <span className="text-xl text-sacred/35 transition-all group-hover:translate-x-1 group-hover:text-accent">
          ↗
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">
          {journey.eyebrow}
        </p>
        <h3 className="mt-3 max-w-lg font-serif text-3xl font-medium leading-[0.98] text-sacred sm:text-4xl">
          {journey.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-sacred/62">
          {journey.body}
        </p>
      </div>
    </Link>
  );
}

export function LandingExperience({ forms }: { forms: KaruppuForm[] }) {
  const progressRef = useScrollProgress();
  const hero = forms[0];

  return (
    <div className="relative overflow-clip bg-void">
      <div className="fixed inset-x-0 top-0 z-[65] h-[2px] bg-sacred/[0.06]">
        <div
          ref={progressRef}
          className="h-full origin-left bg-accent shadow-[0_0_14px_var(--glow)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <section className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-sacred/10">
        <Image
          src={hero.image}
          alt="Artistic interpretation of Sangili Karuppan"
          fill
          priority
          sizes="100vw"
          className="hero-portrait object-cover object-[62%_22%] grayscale-[0.74] saturate-[0.6] brightness-[0.62] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/88 to-void/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_38%,transparent_0%,rgba(4,4,4,0.16)_36%,rgba(4,4,4,0.78)_82%)]" />
        <div className="ritual-grid absolute inset-0 opacity-20" aria-hidden />

        <KeyArtCrest
          aria-hidden
          className="slow-spin pointer-events-none absolute -right-28 top-1/2 hidden h-[38rem] w-[38rem] -translate-y-1/2 text-sacred/[0.09] xl:block"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12">
          <div className="max-w-3xl">
            <div className="hero-rise">
              <Eyebrow num="எல்லை">A living digital shrine</Eyebrow>
            </div>
            <h1 className="mt-6">
              <span className="sr-only">Karuppa. </span>
              <span className="wordmark-rise relative -ml-3 block h-28 w-[min(36rem,92vw)] overflow-hidden sm:h-36 lg:h-44">
                <KaruppuWordmark
                  priority
                  className="absolute left-0 top-1/2 w-full -translate-y-1/2 drop-shadow-[0_0_34px_rgba(255,24,20,0.24)]"
                />
              </span>
              <span className="hero-rise mt-2 block max-w-2xl font-serif text-[clamp(2.45rem,6vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.035em] text-sacred [text-wrap:balance]">
                The guardian at the threshold.
              </span>
            </h1>
            <p className="hero-rise mt-7 max-w-xl text-base leading-relaxed text-sacred/68 sm:text-lg">
              An immersive archive of Karuppu Swamy — told through his forms,
              living worship and the communities that carry his story.
            </p>
            <div className="hero-rise mt-8 flex flex-wrap gap-3">
              <PillButton href="#forms" variant="solid">
                Explore the six forms
              </PillButton>
              <PillButton href="/guardian">Begin the story</PillButton>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl border-t border-sacred/14 sm:grid-cols-3">
          {[
            ["06", "forms revealed"],
            ["108", "forms in tradition"],
            ["10", "paths through the archive"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-4 px-5 py-4 sm:px-8 sm:py-5 lg:px-12",
                index > 0 && "border-t border-sacred/14 sm:border-l sm:border-t-0"
              )}
            >
              <span className="font-serif text-3xl text-sacred sm:text-4xl">{value}</span>
              <span className="max-w-28 font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-sacred/46">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-sacred text-void">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-void/55">
                  01 · The boundary / எல்லை
                </p>
              </div>
              <div>
                <h2 className="max-w-4xl font-serif text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.04em] text-void [text-wrap:balance]">
                  Where the village ends,
                  <span className="text-accent"> the guardian begins.</span>
                </h2>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-void/66 sm:text-lg">
                  Karuppu is remembered at the threshold: protector of place,
                  witness to the oath, and keeper of a justice held in common.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-20 grid border-t border-void/18 md:grid-cols-3 lg:mt-28">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={index * 90}>
                  <article
                    className={cn(
                      "h-full py-8 md:px-8 md:py-10",
                      index > 0 && "border-t border-void/18 md:border-l md:border-t-0"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] tracking-[0.24em] text-void/46">
                        {item.num}
                      </span>
                      <Icon aria-hidden className="h-8 w-8 text-accent" />
                    </div>
                    <p lang="ta" className="mt-10 font-tamil text-base text-void/54">{item.tamil}</p>
                    <h3 className="mt-1 font-serif text-3xl font-medium text-void">{item.title}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-void/62">
                      {item.body}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="forms" className="relative scroll-mt-20 border-b border-sacred/10">
        <div className="ritual-grid absolute inset-0 opacity-10" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <ScrollReveal>
            <div className="grid items-end gap-8 lg:grid-cols-[0.62fr_0.38fr]">
              <div>
                <Eyebrow num="02">The first six rooms</Eyebrow>
                <h2 className="mt-6 max-w-4xl font-serif text-[clamp(3.2rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.045em] text-sacred">
                  One guardian.
                  <span className="block text-accent">Many forms.</span>
                </h2>
              </div>
              <p className="max-w-lg pb-2 text-base leading-relaxed text-sacred/58 lg:justify-self-end">
                Each room carries a different name, element and memory. Choose a
                form to cross from the archive into his sanctum.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 sm:mt-20">
            <FormsAtlas forms={forms} />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <ScrollReveal>
            <div className="flex flex-col gap-7 border-t border-sacred/14 pt-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow num="03">Beyond the threshold</Eyebrow>
                <h2 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[0.94] text-sacred sm:text-6xl">
                  A living tradition,
                  <span className="text-sacred/42"> not a museum.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-sacred/55">
                Follow the story through history, practice, place and migration.
                Every chapter is designed as another room in the same world.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {journeys.map((journey, index) => (
              <ScrollReveal key={journey.href} delay={index * 90} className={cn("h-full", index === 0 ? "lg:col-span-6" : "lg:col-span-3")}>
                <JourneyCard journey={journey} index={index} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <PillButton href="/temples">Explore every chapter</PillButton>
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[76svh] overflow-hidden border-t border-sacred/10">
        <Image
          src="/img/veil/vettai.webp"
          alt=""
          fill
          sizes="100vw"
          className="scale-[1.32] object-cover blur-[18px] grayscale brightness-[0.38]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,24,20,0.08),transparent_28%),linear-gradient(to_bottom,rgba(4,4,4,0.65),rgba(4,4,4,0.96))]" />
        <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-7xl items-center justify-center px-5 py-24 text-center sm:px-8 lg:px-12">
          <ScrollReveal>
            <p lang="ta" className="font-tamil text-xl text-sacred/58">காவல் தொடர்கிறது</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(3.3rem,8vw,8rem)] font-medium leading-[0.86] tracking-[-0.045em] text-sacred [text-wrap:balance]">
              The watch continues.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-sacred/60">
              Enter the archive with reverence. Devotional tradition and
              historical context are kept visibly distinct throughout.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <PillButton href="/forms" variant="solid">Enter the forms</PillButton>
              <PillButton href="/about">Sources &amp; context</PillButton>
            </div>
            <p className="mx-auto mt-10 max-w-lg font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-sacred/35">
              Current deity imagery is presented as artistic interpretation.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
