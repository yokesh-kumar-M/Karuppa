import Link from "next/link";
import { cn } from "@/lib/cn";

/** A high-contrast ritual action used for both internal and external journeys. */
export function PillButton({
  href,
  children,
  variant = "outline",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-3 border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-void",
    variant === "solid"
      ? "border-accent bg-accent text-void shadow-[0_0_28px_var(--glow)] hover:-translate-y-0.5 hover:bg-accent/90"
      : "border-sacred/32 bg-void/18 text-sacred/90 backdrop-blur-sm hover:-translate-y-0.5 hover:border-accent hover:text-accent",
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
