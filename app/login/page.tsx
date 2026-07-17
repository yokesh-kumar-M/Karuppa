import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions, hasGoogleAuth } from "@/auth";
import { GoogleLoginCard } from "@/components/auth/GoogleLoginCard";

export const metadata: Metadata = {
  title: "Login",
  description: "Protected access for Karuppa via Google sign-in.",
};

export default async function LoginPage() {
  const session = hasGoogleAuth ? await getServerSession(authOptions) : null;

  if (session) {
    redirect("/");
  }

  return <GoogleLoginCard configured={hasGoogleAuth} />;
}
