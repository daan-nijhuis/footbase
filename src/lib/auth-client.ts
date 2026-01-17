import { createAuthClient } from "better-auth/react";
import {
  convexClient,
  crossDomainClient,
} from "@convex-dev/better-auth/client/plugins";

// Auth requests go to /api/auth/* which is proxied to Convex via Vercel rewrites
// This keeps the Convex infrastructure URL hidden from users
export const authClient = createAuthClient({
  baseURL: "", // Empty = same origin, uses /api/auth/* path
  plugins: [convexClient(), crossDomainClient()],
});

// Export auth config info for debugging (SSR-safe)
export const authConfig = {
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  isConfigured: true, // Always configured when using same-origin proxy
};
