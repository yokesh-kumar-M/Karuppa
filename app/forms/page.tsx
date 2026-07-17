import type { Metadata } from "next";
import { forms } from "@/services/karuppu";
import { Seal } from "@/components/landing/Seal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeliefTag } from "@/components/ui/BeliefTag";
import { PillButton } from "@/components/ui/PillButton";
import { KolamStar } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Forms",
  description:
    "Enter the first six rooms of Karuppu Swamy — each form carrying a distinct name, element and memory.",
};

/**
 * The Forms index — a navigable set of veiled portals into each sanctum.
 * Regenerates from the registry, so every registered form appears on its own.
 */
export default function FormsIndexPage() {
  return (
    <>
      <section className="relative flex min-h-[56vh] items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-28 text-center">
          <Eyebrow num="02" className="justify-center">
            The Forms
          </Eyebrow>
          <SectionHeading
            as="h1"
            tamil="வடிவங்கள்"
            accent
            className="mx-auto mt-6 max-w-3xl text-5xl md:text-7xl"
          >
            The Fires
          </SectionHeading>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-sacred/75 md:text-2xl">
            One guardian, many rooms. Enter a form to discover its name, place,
            element and devotional memory.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div key={form.id} className="flex justify-center">
              <Seal form={form} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-28 text-center">
        <div className="relative mx-auto grid place-items-center">
          <KolamStar
            aria-hidden
            className="slow-spin h-28 w-28 text-sacred/20"
          />
          <span className="absolute font-display text-lg font-semibold text-sacred/40">
            108
          </span>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-sacred/50">
          <BeliefTag kind="belief" /> Tradition remembers the guardian through
          many more names and local forms.
        </p>
        <div className="mt-8 flex justify-center">
          <PillButton href="/">Back to home</PillButton>
        </div>
      </section>
    </>
  );
}
