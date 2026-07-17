import Link from "next/link";
import Image from "next/image";
import type { KaruppuForm } from "@/services/karuppu";
import { BeliefTag } from "@/components/ui/BeliefTag";

/**
 * A gallery teaser for one form — a heavily blurred, darkened still beneath a
 * void gradient, so no face is ever legible here (plan.md §5: presence, not
 * disclosure). The clear still lives only on the god's own page (/forms/[id]),
 * and this card links there. Blur follows the standardized scale: threshold
 * (48px) at rest, lifting toward the veil (24px) on hover — the blur itself
 * signals proximity. No colour: ash text, blur, and a promise of motion.
 */
export function BlurredStill({ form }: { form: KaruppuForm }) {
  return (
    <Link
      href={`/forms/${form.id}`}
      aria-label={`View ${form.name} — ${form.epithet}`}
      className="group relative block overflow-hidden border border-sacred/12 outline-none transition-colors duration-500 hover:border-sacred/30 focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-void">
        {/* The still — blurred (threshold → veil on hover) and crushed toward
            black so the face never reads. Blur is the narrative gradient. */}
        <Image
          src={form.veil}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          quality={35}
          className="scale-[1.35] object-cover blur-[48px] brightness-[0.4] grayscale transition-[filter,transform] duration-[1200ms] ease-out group-hover:scale-[1.5] group-hover:blur-[24px]"
        />

        {/* Veil — keep it near-black. No colour, only depth. */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/30" />

        {/* A calm archive marker — this is deliberately a veiled study. */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-sacred/15 bg-void/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-sacred/55 backdrop-blur-sm">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-sacred/70"
          />
          Veiled study
        </span>

        {/* Identity — Tamil + English, with the act this form is known for. */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sacred/70">
            {form.num} · {form.region.split(" · ")[0]}
          </p>
          <p lang="ta" className="mt-2 font-tamil text-2xl text-sacred [text-shadow:0_1px_18px_rgba(0,0,0,0.9)]">
            {form.tamil}
          </p>
          <p className="mt-0.5 font-serif text-xl font-medium text-sacred [text-shadow:0_1px_18px_rgba(0,0,0,0.9)]">
            {form.name}
            {form.verify && (
              <>
                {" "}
                <BeliefTag kind="verify" />
              </>
            )}
          </p>
          <p className="mt-2 max-w-[34ch] text-xs leading-relaxed text-sacred/65">
            {form.act}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/55 transition-colors duration-300 group-hover:text-sacred group-focus-visible:text-sacred">
            View
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
