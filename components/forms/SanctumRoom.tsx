import type { CSSProperties } from "react";
import type { KaruppuForm } from "@/services/karuppu";
import { VeiledBackdrop } from "@/components/atmosphere/VeiledBackdrop";
import { SanctumAtmosphere } from "@/components/atmosphere/SanctumAtmosphere";

/**
 * A god's ROOM (plan.md §14). The shrine's halls carry one blood seam; behind
 * this wrapper the seam re-points to HIS colour. `--accent`/`--glow` are
 * `@theme inline` tokens, so overriding the two variables here re-tints every
 * seam utility beneath — eyebrow numerals, CTAs, hairlines, markers — with no
 * component knowing. The law survives the amendment: his colour touches marks,
 * edges and air only; the void stays void and the photographs stay greyscale.
 *
 * Three layers make the room his: the veiled glimpse of his own form, a slow
 * breathing bloom of his light, and his weather (SanctumAtmosphere) drifting
 * as pure added light above the page.
 */
export function SanctumRoom({
  form,
  children,
}: {
  form: KaruppuForm;
  children: React.ReactNode;
}) {
  const { theme } = form;
  return (
    <div
      data-god={form.id}
      style={{ "--accent": theme.accent, "--glow": theme.glow } as CSSProperties}
    >
      <VeiledBackdrop veil={form.veil} intensity="deep" />

      {/* His light — a fixed, breathing bloom in the room's colour. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="aura-breathe absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 46% at 50% 30%, var(--glow), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--accent) 5%, transparent), transparent)",
          }}
        />
      </div>

      {children}

      {/* His weather — painted after the page so it drifts above the imagery,
          screen-blended so it can never darken or obstruct the text. */}
      <SanctumAtmosphere kind={theme.atmosphere} accent={theme.accent} />
    </div>
  );
}
