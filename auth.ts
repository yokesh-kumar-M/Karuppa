import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const hasGoogleAuth = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.NEXTAUTH_SECRET
);

export const authOptions: NextAuthOptions = {
  providers: hasGoogleAuth
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ]
    : [],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  // NextAuth validates a secret even when the provider list is empty. This
  // placeholder is used only in the explicitly disabled state; a real Google
  // configuration is considered active only when NEXTAUTH_SECRET is present.
  secret: process.env.NEXTAUTH_SECRET ?? "karuppa-auth-disabled-no-session-secret",
};

export const authHandler = NextAuth(authOptions);
