import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { TierBadge } from "@/components/app/TierBadge";
import { PositionBadge } from "@/components/app/PositionBadge";
import { RatingDisplay } from "@/components/app/RatingDisplay";
import { StatsCard, StatHighlight } from "@/components/app/StatsCard";
import { PlayerAiReport } from "@/components/app/PlayerAiReport";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/players/$playerId")({
  component: PlayerProfilePage,
});

function PlayerProfilePage() {
  const { playerId } = Route.useParams();
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isRequestingReport, setIsRequestingReport] = useState(false);
  const [requestError, setRequestError] = useState<string | undefined>();

  const { data: player, isLoading } = useQuery(
    convexQuery(api.playerQueries.get, {
      playerId: playerId as Id<"players">,
    })
  );

  // Query for AI report
  const { data: aiReport, isLoading: isAiReportLoading, refetch: refetchAiReport } = useQuery(
    convexQuery(api["ai/playerAiQueries"].getReport, {
      playerId: playerId as Id<"players">,
      window: "365",
      locale: "nl",
    })
  );

  // Track view mutation
  const trackViewMutation = useConvexMutation(api["ai/playerAiQueries"].trackView);

  // Request report mutation
  const requestReportMutation = useConvexMutation(api["ai/playerAiQueries"].requestReport);

  // Track view on mount (once per page load)
  useEffect(() => {
    if (!hasTrackedView && playerId) {
      trackViewMutation({ playerId: playerId as Id<"players"> })
        .then(() => setHasTrackedView(true))
        .catch(() => {
          // Silently fail - view tracking is best-effort
        });
    }
  }, [playerId, hasTrackedView, trackViewMutation]);

  // Handler to request AI report generation
  const handleRequestReport = async () => {
    setIsRequestingReport(true);
    setRequestError(undefined);

    try {
      const result = await requestReportMutation({
        playerId: playerId as Id<"players">,
        window: "365",
        locale: "nl",
      });

      if (!result.success) {
        setRequestError(result.error || "Er is een fout opgetreden");
      } else if (result.queued) {
        // Report was queued, it will be generated async
        // Poll for updates
        setTimeout(() => refetchAiReport(), 3000);
        setTimeout(() => refetchAiReport(), 10000);
        setTimeout(() => refetchAiReport(), 30000);
      }
    } catch {
      setRequestError("Er is een fout opgetreden");
    } finally {
      setIsRequestingReport(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/players">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar spelers
          </Link>
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Speler niet gevonden</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get stats based on position group
  const getPositionStats = () => {
    const per90 = player.stats?.per90;
    if (!per90) return [];

    switch (player.positionGroup) {
      case "GK":
        return [
          { label: "Saves", value: per90.saves, suffix: "/90" },
          { label: "Goals Conceded", value: per90.goalsConceded, suffix: "/90" },
        ];
      case "DEF":
        return [
          { label: "Tackles", value: per90.tackles, suffix: "/90" },
          { label: "Interceptions", value: per90.interceptions, suffix: "/90" },
          { label: "Clearances", value: per90.clearances, suffix: "/90" },
          { label: "Blocks", value: per90.blocks, suffix: "/90" },
          { label: "Duels Won", value: per90.duelsWon, suffix: "/90" },
          { label: "Aerial Duels", value: per90.aerialDuelsWon, suffix: "/90" },
        ];
      case "MID":
        return [
          { label: "Key Passes", value: per90.keyPasses, suffix: "/90" },
          { label: "Passes", value: per90.passes, suffix: "/90" },
          { label: "Tackles", value: per90.tackles, suffix: "/90" },
          { label: "Interceptions", value: per90.interceptions, suffix: "/90" },
          { label: "Dribbles", value: per90.dribblesSuccessful, suffix: "/90" },
          { label: "Goals", value: per90.goals, suffix: "/90" },
        ];
      case "ATT":
        return [
          { label: "Goals", value: per90.goals, suffix: "/90" },
          { label: "Assists", value: per90.assists, suffix: "/90" },
          { label: "Shots", value: per90.shots, suffix: "/90" },
          { label: "xG", value: per90.xG, suffix: "/90" },
          { label: "xA", value: per90.xA, suffix: "/90" },
          { label: "Key Passes", value: per90.keyPasses, suffix: "/90" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/players">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar spelers
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Player Info Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                {player.photoUrl ? (
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 bg-muted"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}

                <h1 className="text-2xl font-bold mb-2">{player.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                  <PositionBadge positionGroup={player.positionGroup} />
                  <span className="text-sm text-muted-foreground">
                    {player.position}
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="w-full space-y-3 text-left">
                  {player.team && (
                    <div className="flex items-center gap-3">
                      {player.team.logoUrl ? (
                        <img
                          src={player.team.logoUrl}
                          alt=""
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded bg-muted" />
                      )}
                      <span className="font-medium">{player.team.name}</span>
                    </div>
                  )}

                  {player.competition && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {player.competition.logoUrl ? (
                          <img
                            src={player.competition.logoUrl}
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded bg-muted" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {player.competition.name}
                        </span>
                      </div>
                      <TierBadge tier={player.competition.tier} />
                    </div>
                  )}

                  <Separator className="my-4" />

                  {player.age && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{player.age} jaar</span>
                      {player.birthDate && (
                        <span className="text-muted-foreground">
                          ({player.birthDate})
                        </span>
                      )}
                    </div>
                  )}

                  {player.nationality && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{player.nationality}</span>
                    </div>
                  )}

                  {player.stats && (
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{player.stats.minutes} minuten gespeeld</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Ratings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rating Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <RatingDisplay
                  rating={player.rating?.rating365}
                  size="lg"
                  showLabel
                  label="Rating (365 dagen)"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <RatingDisplay
                  rating={player.rating?.ratingLast5}
                  size="lg"
                  showLabel
                  label="Rating (Laatste 5)"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <RatingDisplay
                  rating={player.rating?.levelScore}
                  size="lg"
                  showLabel
                  label="Level Score"
                />
              </CardContent>
            </Card>
          </div>

          {/* Per 90 Stats */}
          {player.stats?.per90 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistieken per 90 minuten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {getPositionStats().map((stat, index) => (
                    <StatHighlight
                      key={index}
                      label={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Totals */}
          {player.stats?.totals && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Seizoen totalen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatHighlight
                    label="Wedstrijden"
                    value={player.stats.totals.appearances}
                  />
                  <StatHighlight label="Goals" value={player.stats.totals.goals} />
                  <StatHighlight label="Assists" value={player.stats.totals.assists} />
                  <StatHighlight
                    label="Geel"
                    value={player.stats.totals.yellowCards}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Appearances */}
          {player.recentAppearances && player.recentAppearances.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Laatste 5 wedstrijden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {player.recentAppearances.map((app) => (
                    <div
                      key={app._id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground w-24">
                          {app.matchDate}
                        </span>
                        <span className="text-sm font-medium">
                          {app.minutes} min
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        {app.stats.goals !== undefined && app.stats.goals > 0 && (
                          <span className="text-green-600 font-medium">
                            {app.stats.goals} goal{app.stats.goals > 1 ? "s" : ""}
                          </span>
                        )}
                        {app.stats.assists !== undefined && app.stats.assists > 0 && (
                          <span className="text-blue-600 font-medium">
                            {app.stats.assists} assist{app.stats.assists > 1 ? "s" : ""}
                          </span>
                        )}
                        {app.stats.yellowCards !== undefined &&
                          app.stats.yellowCards > 0 && (
                            <span className="text-yellow-600">
                              {app.stats.yellowCards} geel
                            </span>
                          )}
                        {app.stats.redCards !== undefined &&
                          app.stats.redCards > 0 && (
                            <span className="text-red-600">Rood</span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Report Section */}
          <PlayerAiReport
            report={aiReport}
            isLoading={isAiReportLoading}
            onRequestReport={player.stats?.minutes && player.stats.minutes >= 90 ? handleRequestReport : undefined}
            isRequesting={isRequestingReport}
            error={requestError}
          />
        </div>
      </div>
    </div>
  );
}
