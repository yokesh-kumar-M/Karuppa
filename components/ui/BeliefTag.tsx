import { cn } from "@/lib/cn";

/**
 * Source-honesty marker (build-spec.md source note).
 * `belief` = devotional tradition; `verify` = confirm before publishing.
 */
export function BeliefTag({
  kind = "belief",
  className,
}: {
  kind?: "belief" | "verify";
  className?: string;
}) {
  const label = kind === "verify" ? "VERIFY" : "BELIEF";
  const explanation =
    kind === "verify"
      ? "To be confirmed against primary or temple sources before publishing."
      : "A devotional tradition or claim — presented as such, not as established fact.";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 align-middle font-mono text-[9px] font-medium uppercase tracking-[0.18em]",
        kind === "verify"
          ? "border-sacred/25 text-sacred/50"
          : "border-ashgold/40 text-ashgold/90",
        className
      )}
      aria-label={`${label}: ${explanation}`}
      title={explanation}
    >
      {label}
    </span>
  );
}
