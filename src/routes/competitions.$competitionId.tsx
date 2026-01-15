import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { PlayerFilters, type PlayerFiltersState } from "@/components/app/PlayerFilters";
import { PlayersTable } from "@/components/app/PlayersTable";
import { Pagination } from "@/components/app/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TierBadge } from "@/components/app/TierBadge";
import { StatHighlight } from "@/components/app/StatsCard";
import { ArrowLeft, MapPin, Users, Trophy } from "lucide-react";

interface CompetitionPlayersSearchParams {
  search?: string;
  positionGroup?: string;
  minMinutes?: number;
  window?: "365" | "last5";
  page?: number;
  sort?: string;
  sortDesc?: boolean;
}

export const Route = createFileRoute("/competitions/$competitionId")({
  validateSearch: (search: Record<string, unknown>): CompetitionPlayersSearchParams => {
    return {
      search: (search.search as string) || undefined,
      positionGroup: (search.positionGroup as string) || undefined,
      minMinutes: search.minMinutes ? Number(search.minMinutes) : undefined,
      window: (search.window as "365" | "last5") || undefined,
      page: search.page ? Number(search.page) : undefined,
      sort: (search.sort as string) || undefined,
      sortDesc: search.sortDesc === "true" || search.sortDesc === true,
    };
  },
  component: CompetitionDetailPage,
});

function CompetitionDetailPage() {
  const { competitionId } = Route.useParams();
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();

  // Fetch competition details
  const { data: competition, isLoading: competitionLoading } = useQuery(
    convexQuery(api.competitionQueries.get, {
      competitionId: competitionId as Id<"competitions">,
    })
  );

  // Convert search params to filter state
  const filters: PlayerFiltersState = {
    search: searchParams.search || "",
    country: "",
    competitionId: competitionId,
    tier: "",
    positionGroup: searchParams.positionGroup || "",
    minMinutes: searchParams.minMinutes ?? 300,
    window: searchParams.window || "365",
  };

  const page = searchParams.page || 1;

  // Fetch players for this competition
  const { data: playersData, isLoading: playersLoading } = useQuery(
    convexQuery(api.playerQueries.list, {
      competitionId: competitionId as Id<"competitions">,
      search: filters.search || undefined,
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
        search: newFilters.search !== undefined ? newFilters.search : prev.search,
        positionGroup:
          newFilters.positionGroup !== undefined
            ? newFilters.positionGroup
            : prev.positionGroup,
        minMinutes:
          newFilters.minMinutes !== undefined
            ? newFilters.minMinutes
            : prev.minMinutes,
        window: newFilters.window !== undefined ? newFilters.window : prev.window,
        page: 1,
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

  if (competitionLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-48 w-full rounded-lg mb-6" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/competitions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar competities
          </Link>
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Competitie niet gevonden</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/competitions">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar competities
        </Link>
      </Button>

      {/* Competition Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            {competition.logoUrl ? (
              <img
                src={competition.logoUrl}
                alt={competition.name}
                className="w-20 h-20 object-contain"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                <Trophy className="h-10 w-10 text-muted-foreground" />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{competition.name}</h1>
                <TierBadge tier={competition.tier} />
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {competition.country}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {competition.playerCount} spelers
                </div>
                <span>Seizoen {competition.season}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                <StatHighlight label="Teams" value={competition.teamCount} />
                <StatHighlight label="Spelers" value={competition.playerCount} />
                <StatHighlight
                  label="Sterkte"
                  value={competition.strengthScore?.toFixed(1) || "-"}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            countries={[]}
            competitions={[]}
          />
        </CardContent>
      </Card>

      {/* Players Table */}
      {playersLoading ? (
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
