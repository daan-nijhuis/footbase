import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider } from "convex/react";
import { convex, convexQueryClient } from "./convex";

// Create QueryClient with Convex adapter
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Use Convex's caching/updating for queries
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});

// Connect the Convex query client to the QueryClient
convexQueryClient.connect(queryClient);

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ConvexProvider>
  );
}

// Export queryClient for use in router context if needed
export { queryClient };
