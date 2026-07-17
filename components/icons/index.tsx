import type { ReactElement, SVGProps } from "react";

/**
 * Hand-drawn devotional iconography (currentColor line-art) — the craft that
 * keeps the site from looking generated. Motifs from the build-spec iconography
 * (§1.2) and the 2026 film's key art ("sickles and spears, a horse between").
 */

type Icon = (props: SVGProps<SVGSVGElement>) => ReactElement;

const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

/** Aruval — the curved sickle-sword, his weapon of justice. */
export const Aruval: Icon = (props) => (
  <svg {...base(props)}>
    <path d="M6.5 20.5 10 13.8" />
    <path d="M10 13.8c2-4.6 7.6-6.2 11.5-4.3-2.6 4.3-7.7 6-11.5 4.3Z" />
    <circle cx="9.9" cy="13.9" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

/** Vel — the leaf-bladed spear. */
export const Vel: Icon = (props) => (
  <svg {...base(props)}>
    <path d="M12 22V11" />
    <path d="M12 3c-2.4 2.8-2.4 5.8 0 8 2.4-2.2 2.4-5.2 0-8Z" fill="currentColor" />
  </svg>
);

/** Kuthuvilakku — the oil lamp; lights with a flame when `lit`. */
export const Lamp = ({
  lit = false,
  ...props
}: SVGProps<SVGSVGElement> & { lit?: boolean }) => (
  <svg {...base(props)}>
    <path d="M12 21v-3" />
    <path d="M8 18h8" />
    <path d="M6.8 14.4c0-2.4 2.4-3.4 5.2-3.4s5.2 1 5.2 3.4c-1.6 1.3-3.4 1.8-5.2 1.8s-3.6-.5-5.2-1.8Z" />
    <path d="M16.6 13.5 18.4 13" />
    {lit && (
      <path
        d="M18.7 8.6c1.5 1.6 1.5 4 0 5.4-1.5-1.4-1.5-3.8 0-5.4Z"
        fill="var(--ash)"
        stroke="none"
        className="flame"
        style={{ animation: "flame-flicker 1.4s ease-in-out infinite", transformOrigin: "18.7px 14px" }}
      />
    )}
  </svg>
);

/** Vibhuti — three sacred-ash stripes with a kumkum dot. */
export const Vibhuti: Icon = (props) => (
  <svg {...base(props)}>
    <path d="M4 9h16M4 12h16M4 15h16" />
    <circle cx="12" cy="12" r="1.4" fill="var(--color-fire)" stroke="none" />
  </svg>
);

/** Kolam star — interlaced eight-point geometric motif. */
export const KolamStar: Icon = (props) => (
  <svg {...base({ strokeWidth: 1.1, ...props })}>
    <circle cx="12" cy="12" r="9.2" />
    <rect x="5.4" y="5.4" width="13.2" height="13.2" />
    <rect x="5.4" y="5.4" width="13.2" height="13.2" transform="rotate(45 12 12)" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/** Flame mandala — radiating rays around a sacred fire (computed). */
export const FlameMandala = ({
  rays = 16,
  ...props
}: SVGProps<SVGSVGElement> & { rays?: number }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" {...props}>
    <circle cx="50" cy="50" r="46" strokeWidth="0.8" opacity="0.5" />
    <circle cx="50" cy="50" r="40" strokeWidth="0.8" opacity="0.7" />
    {Array.from({ length: rays }).map((_, i) => {
      const a = (i * 360) / rays;
      const long = i % 2 === 0;
      return (
        <line
          key={i}
          x1="50"
          y1={long ? 10 : 16}
          x2="50"
          y2="22"
          strokeWidth={long ? 1.4 : 0.9}
          strokeLinecap="round"
          transform={`rotate(${a} 50 50)`}
        />
      );
    })}
    <circle cx="50" cy="50" r="7" strokeWidth="1.2" />
    <path
      d="M50 44c2.6 2.8 2.6 6 0 8-2.6-2-2.6-5.2 0-8Z"
      fill="currentColor"
      stroke="none"
      opacity="0.9"
    />
  </svg>
);

/**
 * Key-art crest — a wheel of aruval and vel around a central fire, echoing the
 * film's "lengthy sickles and spears" announcement art. Built from rotated copies.
 */
export const KeyArtCrest = (props: SVGProps<SVGSVGElement>) => {
  const spokes = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" {...props}>
      <circle cx="50" cy="50" r="47" strokeWidth="0.7" opacity="0.4" />
      <circle cx="50" cy="50" r="30" strokeWidth="0.7" opacity="0.55" />
      {/* Vel rays */}
      {spokes.map((a) => (
        <g key={`v${a}`} transform={`rotate(${a} 50 50)`} opacity="0.85">
          <line x1="50" y1="44" x2="50" y2="17" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M50 9c-2 2.4-2 5 0 6.8 2-1.8 2-4.4 0-6.8Z" fill="currentColor" stroke="none" />
        </g>
      ))}
      {/* Aruval crescents between */}
      {spokes.map((a) => (
        <g key={`a${a}`} transform={`rotate(${a + 22.5} 50 50)`} opacity="0.7">
          <path
            d="M50 32c3.4-1.6 6.6-.4 8 2.6-3 1-6.4.2-8-2.6Z"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </g>
      ))}
      {/* Central fire */}
      <circle cx="50" cy="50" r="8.5" strokeWidth="1.1" />
      <path
        d="M50 43.5c3 3.2 3 6.8 0 9-3-2.2-3-5.8 0-9Z"
        fill="var(--ash)"
        stroke="none"
        opacity="0.85"
      />
    </svg>
  );
};
