import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { PlayerFilters, type PlayerFiltersState } from "@/components/app/PlayerFilters";
import { PlayersTable } from "@/components/app/PlayersTable";
import { Pagination } from "@/components/app/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import type { Id } from "../../convex/_generated/dataModel";

// Search params for URL state
interface PlayersSearchParams {
  search?: string;
  country?: string;
  competitionId?: string;
  tier?: string;
  positionGroup?: string;
  minMinutes?: number;
  window?: "365" | "last5";
  page?: number;
  sort?: string;
  sortDesc?: boolean;
}

export const Route = createFileRoute("/players/")({
  validateSearch: (search: Record<string, unknown>): PlayersSearchParams => {
    return {
      search: (search.search as string) || undefined,
      country: (search.country as string) || undefined,
      competitionId: (search.competitionId as string) || undefined,
      tier: (search.tier as string) || undefined,
      positionGroup: (search.positionGroup as string) || undefined,
      minMinutes: search.minMinutes !== undefined ? Number(search.minMinutes) : undefined,
      window: (search.window as "365" | "last5") || undefined,
      page: search.page ? Number(search.page) : undefined,
      sort: (search.sort as string) || undefined,
      sortDesc: search.sortDesc === "true" || search.sortDesc === true,
    };
  },
  component: PlayersPage,
});

function PlayersPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();

  // Convert search params to filter state
  const filters: PlayerFiltersState = {
    search: searchParams.search || "",
    country: searchParams.country || "",
    competitionId: searchParams.competitionId || "",
    tier: searchParams.tier || "",
    positionGroup: searchParams.positionGroup || "",
    minMinutes: searchParams.minMinutes ?? 90,
    window: searchParams.window || "365",
  };

  const page = searchParams.page || 1;

  // Fetch countries for filter
  const { data: countries = [] } = useQuery(
    convexQuery(api.competitionQueries.countries, {})
  );

  // Fetch competitions for filter
  const { data: competitionsData } = useQuery(
    convexQuery(api.competitionQueries.list, {
      isActive: true,
    })
  );
  const competitions = competitionsData || [];

  // Fetch players
  const { data: playersData, isLoading } = useQuery(
    convexQuery(api.playerQueries.list, {
      search: filters.search || undefined,
      country: filters.country || undefined,
      competitionId: filters.competitionId
        ? (filters.competitionId as Id<"competitions">)
        : undefined,
      tier: filters.tier
        ? (filters.tier as "Platinum" | "Diamond" | "Elite" | "Gold" | "Silver" | "Bronze")
        : undefined,
      positionGroup: filters.positionGroup
        ? (filters.positionGroup as "GK" | "DEF" | "MID" | "ATT")
        : undefined,
      minMinutes: filters.minMinutes,
      window: filters.window,
      page,
      pageSize: 25,
      sort: (searchParams.sort as "rating" | "minutes" | "age" | "name") || "rating",
      sortDesc: searchParams.sortDesc ?? true,
    })
  );

  const handleFiltersChange = (newFilters: Partial<PlayerFiltersState>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...newFilters,
        page: 1, // Reset to page 1 when filters change
      }),
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
    });
  };

  const handleSortingChange = (sorting: Array<{ id: string; desc: boolean }>) => {
    if (sorting.length > 0) {
      const sortMap: Record<string, string> = {
        name: "name",
        minutes: "minutes",
        rating365: "rating",
        ratingLast5: "rating",
      };
      const sortId = sortMap[sorting[0].id] || "rating";
      navigate({
        search: (prev) => ({
          ...prev,
          sort: sortId,
          sortDesc: sorting[0].desc,
        }),
      });
    }
  };

  const sorting = searchParams.sort
    ? [
        {
          id:
            searchParams.sort === "rating"
              ? filters.window === "365"
                ? "rating365"
                : "ratingLast5"
              : searchParams.sort,
          desc: searchParams.sortDesc ?? true,
        },
      ]
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Spelers</h1>
          <p className="text-sm text-muted-foreground">
            Ranking en statistieken van spelers
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            countries={countries}
            competitions={competitions.map((c) => ({ _id: c._id, name: c.name }))}
          />
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
        <>
          <PlayersTable
            players={playersData?.players || []}
            window={filters.window}
            sorting={sorting}
            onSortingChange={handleSortingChange}
          />

          {playersData && (
            <Pagination
              page={playersData.pagination.page}
              totalPages={playersData.pagination.totalPages}
              totalCount={playersData.pagination.totalCount}
              pageSize={playersData.pagination.pageSize}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
