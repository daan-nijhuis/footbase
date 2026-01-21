import { useEffect, useRef } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Analytics } from "@vercel/analytics/react";
import type { QueryClient } from "@tanstack/react-query";
import type { ConvexQueryClient } from "@convex-dev/react-query";

import Header from "../components/Header";
import { Providers } from "../lib/providers";
import { authClient } from "../lib/auth-client";

import appCss from "../styles.css?url";

// Router context type
interface RouterContext {
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Footbase - European Football Scouting",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
  shellComponent: RootDocument,
});

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const hasRedirected = useRef(false);

  // Check if on login page (SSR-safe using router state)
  const isLoginPage = pathname === "/login";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (hasRedirected.current) return;
    if (!isLoginPage && !isPending && !session) {
      hasRedirected.current = true;
      router.navigate({ to: "/login" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, session, isLoginPage]);

  // On login page, only render the page content (no header)
  if (isLoginPage) {
    return <Outlet />;
  }

  // Wait for session check or redirect
  if (isPending || !session) {
    return null;
  }

  // Authenticated: render Header + content
  return <>{children}</>;
}

function RootComponent() {
  const { queryClient, convexQueryClient } = Route.useRouteContext();

  return (
    <Providers queryClient={queryClient} convexQueryClient={convexQueryClient}>
      <AuthGuard>
        <Header />
        <Outlet />
      </AuthGuard>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </Providers>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
