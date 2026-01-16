/**
 * Player AI Report Display Component
 *
 * Displays AI-generated player descriptions, archetype, playstyle tags,
 * strengths and weaknesses.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  Target,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface AiReport {
  shortDescription: string;
  longDescription: string;
  archetype: string;
  playstyleTags: string[];
  strengths: string[];
  weaknesses: string[];
  confidence: number;
  generatedAt: number;
  model: string;
  window: "365" | "last5";
}

interface PlayerAiReportProps {
  report: AiReport | null | undefined;
  isLoading: boolean;
  onRequestReport?: () => void;
  isRequesting?: boolean;
  error?: string;
}

export function PlayerAiReport({
  report,
  isLoading,
  onRequestReport,
  isRequesting,
  error,
}: PlayerAiReportProps) {
  if (isLoading) {
    return <PlayerAiReportSkeleton />;
  }

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-amber-500" />
            AI Spelersanalyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Er is nog geen AI-analyse beschikbaar voor deze speler.
            </p>
            {error && (
              <div className="flex items-center justify-center gap-2 text-destructive text-sm mb-4">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            {onRequestReport && (
              <Button
                onClick={onRequestReport}
                disabled={isRequesting}
                variant="outline"
                size="sm"
              >
                {isRequesting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyseren...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Genereer Analyse
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const confidenceLabel = getConfidenceLabel(report.confidence);
  const generatedDate = new Date(report.generatedAt).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      {/* Short Description Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-amber-500" />
              AI Spelersanalyse
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {confidenceLabel}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {report.shortDescription}
          </p>
        </CardContent>
      </Card>

      {/* Archetype and Tags */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4" />
            Speelstijl
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Archetype */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Archetype</p>
            <Badge variant="secondary" className="text-sm">
              {report.archetype}
            </Badge>
          </div>

          {/* Playstyle Tags */}
          {report.playstyleTags.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Kenmerken</p>
              <div className="flex flex-wrap gap-1.5">
                {report.playstyleTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              Sterke Punten
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report.strengths.length > 0 ? (
              <ul className="space-y-1.5">
                {report.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-green-500 mt-1.5">
                      <svg
                        className="h-2 w-2 fill-current"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </span>
                    {strength}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Geen sterke punten geidentificeerd
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-red-600">
              <TrendingDown className="h-4 w-4" />
              Verbeterpunten
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report.weaknesses.length > 0 ? (
              <ul className="space-y-1.5">
                {report.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-red-500 mt-1.5">
                      <svg
                        className="h-2 w-2 fill-current"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </span>
                    {weakness}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Geen verbeterpunten geidentificeerd
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Long Description */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Uitgebreide Analyse</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {report.longDescription}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-4 pt-4 border-t">
            Gegenereerd op {generatedDate} op basis van{" "}
            {report.window === "365" ? "365 dagen" : "laatste 5 wedstrijden"} data
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function PlayerAiReportSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 0.8) return "Hoge betrouwbaarheid";
  if (confidence >= 0.6) return "Gemiddelde betrouwbaarheid";
  if (confidence >= 0.4) return "Lage betrouwbaarheid";
  return "Zeer beperkte data";
}
