import type { MetadataRoute } from "next";
import { navItems } from "@/lib/nav";
import { forms } from "@/services/karuppu";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    ...navItems.map((n) => ({ path: n.href, priority: 0.7 })),
    ...forms.map((f) => ({ path: `/forms/${f.id}`, priority: 0.8 })),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
