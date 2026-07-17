import Link from "next/link";
import { navItems } from "@/lib/nav";
import { KaruppuWordmark } from "@/components/brand/KaruppuWordmark";
import { PillButton } from "@/components/ui/PillButton";

export function SiteFooter() {
  const story = navItems.slice(0, 5);
  const world = navItems.slice(5);

  return (
    <footer className="relative overflow-hidden border-t border-sacred/12 bg-[#070605]">
      <div className="ritual-grid absolute inset-0 opacity-10" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid items-end gap-10 border-b border-sacred/14 pb-16 lg:grid-cols-[0.72fr_0.28fr]">
          <div>
            <p className="font-tamil text-lg text-sacred/52" lang="ta">
              பயணம் தொடர்கிறது
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-medium leading-[0.92] text-sacred sm:text-6xl lg:text-7xl">
              The threshold is only the beginning.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <PillButton href="/forms" variant="solid">
              Enter the forms
            </PillButton>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Karuppa — home"
              className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <KaruppuWordmark className="h-auto w-40 drop-shadow-[0_0_18px_rgba(255,24,20,0.18)]" />
            </Link>
            <p className="mt-6 font-serif text-xl italic leading-relaxed text-sacred/68">
              A living digital shrine for Karuppu Swamy, guardian of the
              threshold and keeper of the oath.
            </p>
          </div>

          <FooterLinks title="The story" items={story} />
          <FooterLinks title="The world" items={world} />

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/48">
              Read with context
            </p>
            <p className="mt-5 text-sm leading-relaxed text-sacred/58">
              Devotional tradition and historical scholarship are clearly
              distinguished. Current deity imagery is artistic interpretation.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-block border-b border-sacred/30 pb-1 text-xs text-sacred/72 outline-none transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
            >
              Sources &amp; project context ↗
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-sacred/12 pt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-sacred/46 sm:flex-row sm:items-center sm:justify-between">
          <p>Karuppa · Kaval Deivam</p>
          <p>Built with reverence · Tamil Nadu &amp; the global diaspora</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  items,
}: {
  title: string;
  items: typeof navItems;
}) {
  return (
    <nav aria-label={`${title} footer links`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sacred/48">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-baseline gap-2 text-sm text-sacred/64 outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="font-mono text-[9px] text-sacred/38 transition-colors group-hover:text-accent">
                {item.num}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
