import { Cinzel, Cormorant_Garamond, Catamaran, Inter } from "next/font/google";

/**
 * Type system (build-spec.md §4.2)
 * - Display (English): Cinzel — cinematic, scripture-like serif.
 * - Serif body accents: Cormorant Garamond (incl. italic) — devotional pull-quotes.
 * - Tamil: Catamaran — pairs with every deity name, never sacrificing legibility.
 * - Body: Inter — clean sans for long-form reading.
 */

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const catamaran = Catamaran({
  subsets: ["tamil", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-catamaran",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** All font CSS-variable classes, to spread onto <html>. */
export const fontVariables = [
  cinzel.variable,
  cormorant.variable,
  catamaran.variable,
  inter.variable,
].join(" ");
