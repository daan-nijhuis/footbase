import { createAuthClient } from "better-auth/react";
import {
  convexClient,
  crossDomainClient,
} from "@convex-dev/better-auth/client/plugins";

// Use relative URL - Nitro will proxy to Convex
export const authClient = createAuthClient({
  baseURL: "",
  plugins: [convexClient(), crossDomainClient()],
});

// Export auth config info for debugging (SSR-safe)
export const authConfig = {
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  isConfigured: true,
};
