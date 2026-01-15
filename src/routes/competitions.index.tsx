import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { CompetitionsTable } from "@/components/app/CompetitionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";

// Use a special value for "all" options since Radix Select doesn't allow empty strings
const ALL_VALUE = "__all__";

interface CompetitionsSearchParams {
  country?: string;
  tier?: string;
}

export const Route = createFileRoute("/competitions/")({
  validateSearch: (search: Record<string, unknown>): CompetitionsSearchParams => {
    return {
      country: (search.country as string) || undefined,
      tier: (search.tier as string) || undefined,
    };
  },
  component: CompetitionsPage,
});

const tiers = [
  { value: ALL_VALUE, label: "Alle tiers" },
  { value: "Platinum", label: "Platinum" },
  { value: "Diamond", label: "Diamond" },
  { value: "Elite", label: "Elite" },
  { value: "Gold", label: "Goud" },
  { value: "Silver", label: "Zilver" },
  { value: "Bronze", label: "Brons" },
];

function CompetitionsPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();

  // Fetch countries
  const { data: countries = [] } = useQuery(
    convexQuery(api.competitionQueries.countries, {})
  );

  // Fetch competitions
  const { data: competitions, isLoading } = useQuery(
    convexQuery(api.competitionQueries.list, {
      country: searchParams.country || undefined,
      tier: searchParams.tier
        ? (searchParams.tier as "Platinum" | "Diamond" | "Elite" | "Gold" | "Silver" | "Bronze")
        : undefined,
    })
  );

  const handleCountryChange = (value: string) => {
    const actualValue = value === ALL_VALUE ? undefined : value;
    navigate({
      search: (prev) => ({
        ...prev,
        country: actualValue,
      }),
    });
  };

  const handleTierChange = (value: string) => {
    const actualValue = value === ALL_VALUE ? undefined : value;
    navigate({
      search: (prev) => ({
        ...prev,
        tier: actualValue,
      }),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Competities</h1>
          <p className="text-sm text-muted-foreground">
            Overzicht van alle competities en hun sterkte
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select
              value={searchParams.country || ALL_VALUE}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Land" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>Alle landen</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={searchParams.tier || ALL_VALUE}
              onValueChange={handleTierChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                {tiers.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <CompetitionsTable competitions={competitions || []} />
      )}
    </div>
  );
}
