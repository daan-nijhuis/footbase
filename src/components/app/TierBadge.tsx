import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tier = "Platinum" | "Diamond" | "Elite" | "Gold" | "Silver" | "Bronze";

interface TierBadgeProps {
  tier: Tier | string | undefined | null;
  className?: string;
}

const tierConfig: Record<Tier, { label: string; variant: "platinum" | "diamond" | "elite" | "gold" | "silver" | "bronze" }> = {
  Platinum: { label: "Platinum", variant: "platinum" },
  Diamond: { label: "Diamond", variant: "diamond" },
  Elite: { label: "Elite", variant: "elite" },
  Gold: { label: "Goud", variant: "gold" },
  Silver: { label: "Zilver", variant: "silver" },
  Bronze: { label: "Brons", variant: "bronze" },
};

export function TierBadge({ tier, className }: TierBadgeProps) {
  if (!tier) {
    return (
      <Badge variant="outline" className={cn("text-muted-foreground", className)}>
        -
      </Badge>
    );
  }

  const config = tierConfig[tier as Tier];
  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {tier}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
