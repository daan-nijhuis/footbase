Welcome to your new TanStack app! 

# Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

## Styling

This project uses CSS for styling.




## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).


## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## State Management

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
pnpm add @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

function App() {
  const count = useStore(countStore);
  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
    </div>
  );
}

export default App;
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";
import "./App.css";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}

export default App;
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

---

# Data Ingestion (API-Football)

The application includes a data ingestion pipeline that fetches football data from [API-Football](https://www.api-football.com/) (API-Sports).

## Setup

### 1. Get an API Key

Sign up at [API-Sports](https://dashboard.api-football.com/) to get your API key. The free plan includes 100 requests/day.

### 2. Configure Environment Variables

In the Convex Dashboard, go to **Settings > Environment Variables** and add:

| Variable | Value | Description |
|----------|-------|-------------|
| `API_FOOTBALL_KEY` | Your API key | Required |
| `API_FOOTBALL_MODE` | `apisports` or `rapidapi` | Optional, defaults to `apisports` |

**Authentication modes:**
- `apisports`: Uses `x-apisports-key` header (default)
- `rapidapi`: Uses `x-rapidapi-host` and `x-rapidapi-key` headers

## Manual Ingestion (Testing)

You can manually trigger ingestion from the Convex Dashboard:

### 1. Run Competition/Team/Player Ingestion

Go to **Functions > internal.admin.adminRunIngestionNow** and run with:

```json
{
  "maxRequests": 30,
  "countries": ["Netherlands", "Germany"],
  "season": "2024"
}
```

### 2. Run Fixture/Appearance Ingestion

Go to **Functions > internal.admin.adminRunFixturesNow** and run with:

```json
{
  "dateFrom": "2024-01-01",
  "dateTo": "2024-01-07",
  "maxRequests": 20,
  "countries": ["Netherlands", "Germany"]
}
```

### 3. Run Full Daily Cycle

Go to **Functions > internal.admin.adminRunDailyNow** and run with:

```json
{}
```

## Competition Management

### Set Competition Tier

Go to **Functions > internal.admin.setCompetitionTier** and run with:

```json
{
  "competitionId": "<convex_id>",
  "tier": "Gold"
}
```

Valid tiers: `Platinum`, `Diamond`, `Elite`, `Gold`, `Silver`, `Bronze`

### Toggle Competition Active Status

Go to **Functions > internal.admin.setCompetitionActive** and run with:

```json
{
  "competitionId": "<convex_id>",
  "isActive": true
}
```

## Inspect Data

### List Competitions

Use query **admin.listCompetitions**:

```json
{
  "country": "Netherlands",
  "activeOnly": true
}
```

### View Ingestion History

Use query **admin.listIngestionRuns**:

```json
{
  "limit": 10
}
```

### Get Stats Summary

Use query **admin.getIngestionStats** with no arguments.

## Automatic Ingestion (Cron)

A daily cron job runs at 04:00 UTC that:
1. Ingests competitions, teams, and players for NL + DE (50 requests max)
2. Ingests fixtures from the last 2 days (30 requests max)

Total budget: ~80 requests/day, safe for free plan.

## Architecture

```
convex/
├── providers/
│   ├── apiFootballClient.ts  # HTTP client with rate limiting
│   ├── apiFootball.ts        # API-Football data fetching
│   ├── fotmob.ts             # Stub for future provider
│   └── sofascore.ts          # Stub for future provider
├── ingest/
│   ├── apiFootballIngest.ts  # Ingestion actions
│   └── cronRunner.ts         # Daily cron handler
├── admin.ts                  # Admin functions for dashboard
├── crons.ts                  # Cron job definitions
└── schema.ts                 # Database schema
```

## Troubleshooting

### "API_FOOTBALL_KEY environment variable is not set"

Add your API key in the Convex Dashboard under Settings > Environment Variables.

### "Rate limit exceeded after max retries" (429 errors)

The free plan has 100 requests/day. The ingestion system tracks usage and stops when `maxRequests` is reached. Wait 24 hours for the limit to reset, or reduce `maxRequests`.

### "API returned errors: ..."

Check the API-Football documentation for the specific error. Common issues:
- Invalid season year (use current or recent season)
- Country name mismatch (use exact names like "Netherlands" not "NL")

### Players not appearing

1. Check that teams were ingested first (teams must exist before players)
2. Run ingestion for teams first, then players
3. Check the ingestion state: `ingestionState` table shows progress per competition

### Duplicate data after re-running

The system is idempotent - it uses provider IDs to update existing records rather than creating duplicates. If you see duplicates, check the `providerPlayerId` index.

---

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
