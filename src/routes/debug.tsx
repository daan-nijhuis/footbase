import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  const { data, isLoading, error, refetch } = useQuery(
    convexQuery(api.health.ping, {})
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Footbase Debug</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Health Check Card */}
        <Card>
          <CardHeader>
            <CardTitle>Convex Health Check</CardTitle>
            <CardDescription>
              Tests connectivity to Convex backend
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-muted-foreground">Loading...</div>
            )}
            {error && (
              <div className="text-destructive">
                Error: {error instanceof Error ? error.message : String(error)}
              </div>
            )}
            {data && (
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => refetch()} variant="outline">
              Refresh
            </Button>
          </CardFooter>
        </Card>

        {/* Environment Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Info</CardTitle>
            <CardDescription>Current configuration details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Convex URL:</span>
                <span className="font-mono text-sm">
                  {import.meta.env.VITE_CONVEX_URL || "Not configured"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <span className="font-mono text-sm">{import.meta.env.MODE}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Schema Overview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
          <CardDescription>MVP data model tables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "competitions", desc: "League/competition data" },
              { name: "teams", desc: "Team information" },
              { name: "players", desc: "Player profiles" },
              { name: "appearances", desc: "Per-match stats" },
              { name: "playerRollingStats", desc: "Aggregated statistics" },
              { name: "ratingProfiles", desc: "Position-based weights" },
              { name: "playerRatings", desc: "Computed ratings" },
              { name: "competitionRatings", desc: "League strength scores" },
              { name: "ingestionRuns", desc: "Data pipeline tracking" },
            ].map((table) => (
              <div
                key={table.name}
                className="p-3 border border-border rounded-lg"
              >
                <div className="font-medium text-sm">{table.name}</div>
                <div className="text-xs text-muted-foreground">{table.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
