import { authHandler, hasGoogleAuth } from "@/auth";

const authDisabled = () =>
  Response.json(
    { error: "Google sign-in is not configured." },
    { status: 503 }
  );

const providersUnavailable = () => Response.json({});

export const GET = hasGoogleAuth ? authHandler : providersUnavailable;
export const POST = hasGoogleAuth ? authHandler : authDisabled;
