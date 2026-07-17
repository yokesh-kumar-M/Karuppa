import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { KaruppuForm } from "@/services/karuppu";
import { FlameMandala } from "@/components/icons";
import { BeliefTag } from "@/components/ui/BeliefTag";

/** A form portal: veiled artwork, identity, region and a clear path inward. */
export function Seal({ form }: { form: KaruppuForm }) {
  return (
    <Link
      href={`/forms/${form.id}`}
      aria-label={`Enter ${form.name} — ${form.epithet}`}
      data-god={form.id}
      style={
        {
          "--accent": form.theme.accent,
          "--glow": form.theme.glow,
        } as CSSProperties
      }
      className="group block w-full max-w-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-void"
    >
      <article className="relative isolate aspect-[4/5] overflow-hidden border border-sacred/12 bg-stone transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/55 group-hover:shadow-[0_24px_70px_-38px_var(--glow)]">
        <Image
          src={form.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top grayscale-[0.82] saturate-[0.58] brightness-[0.7] transition-all duration-700 group-hover:scale-[1.035] group-hover:grayscale-[0.58] group-hover:brightness-[0.82]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/30" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <span className="font-mono text-[10px] tracking-[0.28em] text-sacred/72">
            {form.num}
          </span>
          <FlameMandala
            aria-hidden
            className="slow-spin h-11 w-11 text-accent opacity-65 transition-opacity group-hover:opacity-100"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <span lang="ta" className="font-tamil text-base text-sacred/66">
              {form.tamil}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/85">
              {form.theme.element}
            </span>
          </div>
          <h2 className="mt-1 font-serif text-3xl font-medium leading-none text-sacred">
            {form.name}
            {form.verify && (
              <>
                {" "}
                <BeliefTag kind="verify" />
              </>
            )}
          </h2>
          <p className="mt-3 text-sm text-sacred/68">{form.epithet}</p>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-sacred/16 pt-4">
            <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-sacred/46">
              {form.region}
            </span>
            <span
              aria-hidden
              className="text-xl text-accent transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
