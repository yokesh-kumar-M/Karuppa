/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Local stills live in /public/img — modern formats for the optimiser.
    formats: ["image/avif", "image/webp"],
    // Allowed quality levels (required from Next 16). Low q for blurred backdrops.
    qualities: [30, 35, 50, 75],
  },
  // The asset pipelines (optimize-images / brand-derivatives) overwrite these
  // files IN PLACE under the same names, so they must not be immutable — but
  // they change rarely, so a month in cache with background revalidation keeps
  // repeat visits from re-fetching a single still, icon, card or clip.
  async headers() {
    const longCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=2592000, stale-while-revalidate=604800",
      },
    ];
    return [
      { source: "/img/:path*", headers: longCache },
      { source: "/icons/:path*", headers: longCache },
      { source: "/og/:path*", headers: longCache },
      { source: "/video/:path*", headers: longCache },
    ];
  },
};

export default nextConfig;
