import { cn } from "@/lib/cn";

/** Tracked-out mono eyebrow with a numbered ritual mark (e.g. `01 · GUARDIAN`). */
export function Eyebrow({
  num,
  children,
  className,
}: {
  num?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-sacred/68",
        className
      )}
    >
      {num && <span className="text-accent">{num}</span>}
      {num && <span aria-hidden className="text-sacred/25">·</span>}
      <span>{children}</span>
    </p>
  );
}
