import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number | undefined | null;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

function getRatingColor(rating: number): string {
  if (rating >= 80) return "text-green-600";
  if (rating >= 60) return "text-emerald-600";
  if (rating >= 40) return "text-amber-600";
  if (rating >= 20) return "text-orange-600";
  return "text-red-600";
}

function getRatingBgColor(rating: number): string {
  if (rating >= 80) return "bg-green-50";
  if (rating >= 60) return "bg-emerald-50";
  if (rating >= 40) return "bg-amber-50";
  if (rating >= 20) return "bg-orange-50";
  return "bg-red-50";
}

export function RatingDisplay({
  rating,
  size = "md",
  showLabel = false,
  label,
  className,
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: "text-sm font-medium",
    md: "text-base font-semibold",
    lg: "text-2xl font-bold",
  };

  if (rating === undefined || rating === null) {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        {showLabel && label && (
          <span className="text-xs text-muted-foreground mb-1">{label}</span>
        )}
        <span className={cn("text-muted-foreground", sizeClasses[size])}>-</span>
      </div>
    );
  }

  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {showLabel && label && (
        <span className="text-xs text-muted-foreground mb-1">{label}</span>
      )}
      <span
        className={cn(
          sizeClasses[size],
          getRatingColor(rating),
          size === "lg" && cn("px-3 py-1 rounded-lg", getRatingBgColor(rating))
        )}
      >
        {roundedRating.toFixed(1)}
      </span>
    </div>
  );
}
