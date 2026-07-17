/**
 * Canonical site identity — one place for the deploy URL and the name, shared
 * by metadata, the sitemap, robots and the JSON-LD. Set NEXT_PUBLIC_SITE_URL
 * on the deployment (e.g. https://karuppa.vercel.app) to repoint everything.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karuppa.vercel.app";

export const siteName = "Karuppa";

export const siteTitle = "Karuppa — Kaval Deivam, the Guardian of Justice";

export const siteDescription =
  "A cinematic digital shrine for Karuppu Swamy, the guardian deity (kaval deivam) of Dravidian folk religion — revealed form by form, power by power.";
