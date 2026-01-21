import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DataSource = "statsbomb" | "fotmob" | "sofascore" | "apiFootball";

interface DataSourceBadgeProps {
  source: DataSource | string | undefined | null;
  className?: string;
  showLabel?: boolean;
}

const sourceConfig: Record<
  DataSource,
  {
    label: string;
    variant: "statsbomb" | "fotmob" | "sofascore" | "apifootball";
  }
> = {
  statsbomb: { label: "StatsBomb", variant: "statsbomb" },
  fotmob: { label: "FotMob", variant: "fotmob" },
  sofascore: { label: "SofaScore", variant: "sofascore" },
  apiFootball: { label: "API-Football", variant: "apifootball" },
};

export function DataSourceBadge({
  source,
  className,
  showLabel = true,
}: DataSourceBadgeProps) {
  if (!source) {
    return null;
  }

  const config = sourceConfig[source as DataSource];
  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {source}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} className={cn("text-xs", className)}>
      {showLabel ? config.label : config.label.charAt(0)}
    </Badge>
  );
}
