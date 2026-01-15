import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

interface PositionBadgeProps {
  positionGroup: PositionGroup | string;
  className?: string;
}

const positionConfig: Record<PositionGroup, { label: string; variant: "gk" | "def" | "mid" | "att" }> = {
  GK: { label: "GK", variant: "gk" },
  DEF: { label: "DEF", variant: "def" },
  MID: { label: "MID", variant: "mid" },
  ATT: { label: "ATT", variant: "att" },
};

export function PositionBadge({ positionGroup, className }: PositionBadgeProps) {
  const config = positionConfig[positionGroup as PositionGroup];

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {positionGroup}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
