import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Aruval, Vel, Lamp } from "@/components/icons";

/**
 * The three plain truths of the hall — what is shown, what is coming, and how to
 * see a god. Page-specific to the gallery so it reads richer than the shared
 * card grid. Icons are decorative; the words carry the meaning.
 */
const notes = [
  {
    Icon: Lamp,
    label: "The veil",
    body: "Each form is held in shadow here. The blur marks distance; the full artistic study is reserved for the form's own sanctum.",
  },
  {
    Icon: Vel,
    label: "The remembered act",
    body: "Each form carries a short account of the protective act associated with his name, presented as devotional memory.",
  },
  {
    Icon: Aruval,
    label: "Enter a room",
    body: "Open any veiled study to cross into its room, where identity, place, element and story are brought together.",
  },
];

export function HallNote() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {notes.map(({ Icon, label, body }, i) => (
        <ScrollReveal key={label} delay={i * 90}>
          <div className="flex h-full flex-col border border-sacred/12 bg-stone/40 p-6 transition-colors duration-500 hover:border-accent/40">
            <Icon aria-hidden className="h-7 w-7 text-accent" />
            <h3 className="mt-4 font-serif text-xl font-medium text-sacred">
              {label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-sacred/65">{body}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
