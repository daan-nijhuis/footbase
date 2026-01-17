import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { authClient } from "./auth-client";

interface ProvidersProps {
  children: React.ReactNode;
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}

export function Providers({
  children,
  queryClient,
  convexQueryClient,
}: ProvidersProps) {
  return (
    <ConvexBetterAuthProvider
      client={convexQueryClient.convexClient}
      authClient={authClient}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexBetterAuthProvider>
  );
}
