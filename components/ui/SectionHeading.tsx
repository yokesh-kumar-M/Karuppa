import { type ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Cinematic serif heading, paired with its Tamil line above (build-spec.md §4.2).
 * Monochrome (plan.md §2): `accent` just sets full-strength ash; default ash too —
 * hierarchy comes from size and weight, never hue.
 */
export function SectionHeading({
  tamil,
  children,
  as: Tag = "h2",
  accent = false,
  className,
}: {
  tamil?: string;
  children: React.ReactNode;
  as?: ElementType;
  accent?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-serif font-medium leading-[0.98] tracking-[-0.025em]",
        accent ? "brush-heading text-accent" : "text-sacred",
        className
      )}
    >
      {tamil && (
        <span lang="ta" className="mb-3 block font-tamil text-[0.5em] font-medium tracking-normal text-sacred/72">
          {tamil}
        </span>
      )}
      {children}
    </Tag>
  );
}
