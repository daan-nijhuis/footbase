import { createAuthClient } from "better-auth/react";
import {
  convexClient,
  crossDomainClient,
} from "@convex-dev/better-auth/client/plugins";

// Get the Convex site URL for auth endpoints
const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

// Validate that the auth URL is configured correctly
if (!convexSiteUrl) {
  console.error(
    "VITE_CONVEX_SITE_URL is not set. Auth will not work. " +
    "Please set this environment variable to your Convex site URL (e.g., https://your-project.convex.site)"
  );
}

// Check if the URL looks like a Convex site URL
if (convexSiteUrl && !convexSiteUrl.includes(".convex.site")) {
  console.warn(
    `VITE_CONVEX_SITE_URL (${convexSiteUrl}) does not look like a Convex site URL. ` +
    "Expected format: https://your-project.convex.site"
  );
}

export const authClient = createAuthClient({
  baseURL: convexSiteUrl,
  plugins: [convexClient(), crossDomainClient()],
});

// Export auth config info for debugging
export const authConfig = {
  baseURL: convexSiteUrl,
  isConfigured: Boolean(convexSiteUrl && convexSiteUrl.includes(".convex.site")),
};
