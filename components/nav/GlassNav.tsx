"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { KaruppuWordmark } from "@/components/brand/KaruppuWordmark";

const primaryHrefs = new Set(["/guardian", "/forms", "/worship", "/temples"]);

export function GlassNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const primary = useMemo(
    () => navItems.filter((item) => primaryHrefs.has(item.href)),
    []
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !open) return;

      const focusable = [
        toggleRef.current,
        ...Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>(
            'a[href]:not([tabindex="-1"])'
          ) ?? []
        ),
      ].filter((item): item is HTMLElement => Boolean(item));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const previous = document.body.style.overflow;
    const background = [
      document.getElementById("main"),
      document.querySelector("footer"),
      document.querySelector(".ambient-sound"),
    ].filter((item): item is HTMLElement => item instanceof HTMLElement);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    background.forEach((item) => {
      item.inert = true;
    });
    const frame = requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>('a[href]:not([tabindex="-1"])')?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      window.__lenis?.start();
      background.forEach((item) => {
        item.inert = false;
      });
    };
  }, [open]);

  return (
    <header className="site-header pointer-events-none fixed inset-x-0 top-0 z-50 px-3 sm:px-5 print:hidden">
      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto relative z-20 mx-auto flex h-14 w-full max-w-7xl items-center justify-between",
          "border border-sacred/12 bg-void/90 px-3 shadow-[0_18px_70px_-30px_rgba(0,0,0,0.95)]",
          "backdrop-blur-2xl supports-[backdrop-filter]:bg-void/84 sm:h-16 sm:px-4"
        )}
      >
        <Link
          href="/"
          tabIndex={open ? -1 : undefined}
          aria-label="Karuppa — home"
          className="group flex h-11 min-w-0 items-center px-2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <KaruppuWordmark priority className="h-8 w-24 object-contain object-left drop-shadow-[0_0_18px_rgba(255,24,20,0.2)] sm:h-9 sm:w-28" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {primary.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? -1 : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-11 items-center px-4 text-[12px] font-medium tracking-[0.08em] outline-none transition-colors",
                  "after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:transition-transform",
                  active
                    ? "text-sacred after:scale-x-100 after:bg-accent"
                    : "text-sacred/58 after:scale-x-0 after:bg-sacred/40 hover:text-sacred hover:after:scale-x-100 focus-visible:text-sacred focus-visible:ring-2 focus-visible:ring-accent"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="chapter-menu"
          onClick={() => setOpen((value) => !value)}
          className="group flex h-11 items-center gap-3 border-l border-sacred/12 px-3 text-left outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent sm:px-4"
        >
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-sacred/62 sm:block">
            {open ? "Close" : "Chapters"}
          </span>
          <span className="relative block h-4 w-5" aria-hidden>
            <span
              className={cn(
                "absolute left-0 top-1 block h-px bg-current transition-all duration-300",
                open ? "w-5 translate-y-[3px] rotate-45" : "w-5"
              )}
            />
            <span
              className={cn(
                "absolute bottom-1 right-0 block h-px bg-current transition-all duration-300",
                open ? "w-5 -translate-y-[3px] -rotate-45" : "w-3.5 group-hover:w-5"
              )}
            />
          </span>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      <div
        ref={menuRef}
        id="chapter-menu"
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-10 overflow-y-auto bg-void/96 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-2xl",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <div className="ritual-grid absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
            <div className="max-w-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
                The living archive
              </p>
              <h2 className="mt-5 font-serif text-4xl font-medium leading-[0.95] text-sacred sm:text-5xl">
                Ten paths into the guardian&rsquo;s world.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-sacred/58">
                Begin with the story, enter the forms, or follow worship and
                memory across the lands.
              </p>
            </div>

            <ol className="grid border-t border-sacred/12 sm:grid-cols-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="border-b border-sacred/12 sm:odd:border-r">
                    <Link
                      href={item.href}
                      tabIndex={open ? 0 : -1}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group grid min-h-24 grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-2 py-4 outline-none transition-colors sm:min-h-28 sm:px-4",
                        active
                          ? "bg-sacred/[0.055]"
                          : "hover:bg-sacred/[0.035] focus-visible:bg-sacred/[0.055]"
                      )}
                    >
                      <span className="font-mono text-[10px] tracking-[0.22em] text-accent">
                        {item.num}
                      </span>
                      <span>
                        <span lang="ta" className="block font-tamil text-sm text-sacred/48">
                          {item.tamil}
                        </span>
                        <span className="mt-1 block font-serif text-2xl text-sacred transition-colors group-hover:text-accent sm:text-3xl">
                          {item.label}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="text-lg text-sacred/28 transition-all group-hover:translate-x-1 group-hover:text-accent"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-sacred/12 pt-6 text-xs text-sacred/42 sm:flex-row sm:items-center sm:justify-between">
            <span><span lang="ta">கருப்பு சாமி</span> · Kaval Deivam</span>
            <Link
              href="/about"
              tabIndex={open ? 0 : -1}
              className="outline-none transition-colors hover:text-sacred focus-visible:text-accent"
            >
              Sources, context &amp; project notes →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
