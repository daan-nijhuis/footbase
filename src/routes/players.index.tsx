import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { PlayerFilters, type PlayerFiltersState } from "@/components/app/PlayerFilters";
import { PlayersTable } from "@/components/app/PlayersTable";
import { Pagination } from "@/components/app/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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

  // Count active filters for badge
  const activeFilterCount = [
    filters.search,
    filters.country,
    filters.competitionId,
    filters.tier,
    filters.positionGroup,
    filters.minMinutes !== 90,
    filters.window !== "365",
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
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

        {/* Mobile Filter Toggle Button */}
        <Button
          variant={isFiltersOpen ? "default" : "outline"}
          size="sm"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="md:hidden relative"
        >
          {isFiltersOpen ? (
            <X className="h-4 w-4 mr-2" />
          ) : (
            <SlidersHorizontal className="h-4 w-4 mr-2" />
          )}
          Filters
          {activeFilterCount > 0 && !isFiltersOpen && (
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filters - Always visible on desktop, animated on mobile */}
      <div className="hidden md:block mb-6">
        <Card>
          <CardContent className="pt-6">
            <PlayerFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              countries={countries}
              competitions={competitions.map((c) => ({ _id: c._id, name: c.name }))}
            />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filters with Animation */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="md:hidden overflow-hidden mb-6"
          >
            <Card>
              <CardContent className="pt-6">
                <PlayerFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  countries={countries}
                  competitions={competitions.map((c) => ({ _id: c._id, name: c.name }))}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

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
