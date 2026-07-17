import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const hasAuthConfig = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.NEXTAUTH_SECRET
);

const protectedSite = withAuth({
  pages: {
    signIn: "/login",
  },
});

/**
 * Keep the shrine usable in a fresh checkout. Once the three auth variables
 * are present the existing Google gate turns on automatically; without them,
 * public pages remain available instead of failing with a server-config error.
 */
export default hasAuthConfig ? protectedSite : () => NextResponse.next();

export const config = {
  // Everything is behind the login except the auth flow itself and the
  // assets that must stay public: images, OG cards, icons, video, the PWA
  // manifest and the SEO files — otherwise social scrapers and installed
  // PWAs get redirected to /login instead of the artwork.
  matcher: [
    "/((?!api/auth|login|img|og|icons|video|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|manifest.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};
