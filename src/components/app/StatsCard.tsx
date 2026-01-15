import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: number | string | undefined | null;
  suffix?: string;
}

interface StatsCardProps {
  title: string;
  stats: StatItem[];
  className?: string;
}

export function StatsCard({ title, stats, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="text-lg font-semibold">
                {stat.value !== undefined && stat.value !== null
                  ? typeof stat.value === "number"
                    ? stat.value.toFixed(stat.suffix ? 2 : 0)
                    : stat.value
                  : "-"}
                {stat.suffix && stat.value !== undefined && stat.value !== null && (
                  <span className="text-xs text-muted-foreground ml-0.5">
                    {stat.suffix}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatHighlightProps {
  label: string;
  value: number | string | undefined | null;
  suffix?: string;
  className?: string;
}

export function StatHighlight({ label, value, suffix, className }: StatHighlightProps) {
  return (
    <div className={cn("flex flex-col items-center p-4 rounded-lg bg-muted/50", className)}>
      <span className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className="text-2xl font-bold mt-1">
        {value !== undefined && value !== null
          ? typeof value === "number"
            ? value.toFixed(suffix ? 2 : 0)
            : value
          : "-"}
        {suffix && value !== undefined && value !== null && (
          <span className="text-sm font-normal text-muted-foreground ml-0.5">
            {suffix}
          </span>
        )}
      </span>
    </div>
  );
}
