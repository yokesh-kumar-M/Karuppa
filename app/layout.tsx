import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import { AppChrome } from "@/components/layout/AppChrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: "%s · Karuppa",
  },
  description: siteDescription,
  keywords: [
    "Karuppu Swamy",
    "Karuppasamy",
    "Sangili Karuppan",
    "kaval deivam",
    "Tamil folk deity",
    "guardian deity",
  ],
  openGraph: {
    siteName,
    title: siteTitle,
    description:
      "A cinematic digital shrine for the guardian deity Karuppu Swamy — revealed form by form, power by power.",
    type: "website",
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/** WebSite structured data — the shrine, named for search. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: "Karuppu — Kaval Deivam",
  url: siteUrl,
  description: siteDescription,
  inLanguage: ["en", "ta"],
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-void font-sans text-sacred antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
