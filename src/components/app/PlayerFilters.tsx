import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

// Use a special value for "all" options since Radix Select doesn't allow empty strings
const ALL_VALUE = "__all__";

export interface PlayerFiltersState {
  search: string;
  country: string;
  competitionId: string;
  tier: string;
  positionGroup: string;
  minMinutes: number;
  window: "365" | "last5";
}

interface PlayerFiltersProps {
  filters: PlayerFiltersState;
  onFiltersChange: (filters: Partial<PlayerFiltersState>) => void;
  countries: string[];
  competitions: Array<{ _id: string; name: string }>;
}

const tiers = [
  { value: ALL_VALUE, label: "Alle tiers" },
  { value: "Platinum", label: "Platinum" },
  { value: "Diamond", label: "Diamond" },
  { value: "Elite", label: "Elite" },
  { value: "Gold", label: "Goud" },
  { value: "Silver", label: "Zilver" },
  { value: "Bronze", label: "Brons" },
];

const positionGroups = [
  { value: ALL_VALUE, label: "Alle posities" },
  { value: "GK", label: "Keepers" },
  { value: "DEF", label: "Verdedigers" },
  { value: "MID", label: "Middenvelders" },
  { value: "ATT", label: "Aanvallers" },
];

const minMinutesOptions = [
  { value: "0", label: "Geen minimum" },
  { value: "90", label: "90+ min" },
  { value: "300", label: "300+ min" },
  { value: "450", label: "450+ min" },
  { value: "900", label: "900+ min" },
];

// Convert empty string to ALL_VALUE for Select display
const toSelectValue = (value: string) => value || ALL_VALUE;
// Convert ALL_VALUE back to empty string for state
const fromSelectValue = (value: string) => value === ALL_VALUE ? "" : value;

export function PlayerFilters({
  filters,
  onFiltersChange,
  countries,
  competitions,
}: PlayerFiltersProps) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFiltersChange({ search: e.target.value });
    },
    [onFiltersChange]
  );

  const handleClearSearch = useCallback(() => {
    onFiltersChange({ search: "" });
  }, [onFiltersChange]);

  const handleClearAll = useCallback(() => {
    onFiltersChange({
      search: "",
      country: "",
      competitionId: "",
      tier: "",
      positionGroup: "",
      minMinutes: 90,
      window: "365",
    });
  }, [onFiltersChange]);

  const hasActiveFilters =
    filters.search ||
    filters.country ||
    filters.competitionId ||
    filters.tier ||
    filters.positionGroup ||
    filters.minMinutes !== 90 ||
    filters.window !== "365";

  return (
    <div className="space-y-4">
      {/* Search and window toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek speler..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-9 pr-9"
          />
          {filters.search && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Tabs
          value={filters.window}
          onValueChange={(value) =>
            onFiltersChange({ window: value as "365" | "last5" })
          }
        >
          <TabsList>
            <TabsTrigger value="365">365 dagen</TabsTrigger>
            <TabsTrigger value="last5">Laatste 5</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Filter selects */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <Select
          value={toSelectValue(filters.country)}
          onValueChange={(value) => onFiltersChange({ country: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Land" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Alle landen</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.competitionId)}
          onValueChange={(value) => onFiltersChange({ competitionId: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Competitie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Alle competities</SelectItem>
            {competitions.map((comp) => (
              <SelectItem key={comp._id} value={comp._id}>
                {comp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.tier)}
          onValueChange={(value) => onFiltersChange({ tier: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            {tiers.map((tier) => (
              <SelectItem key={tier.value} value={tier.value}>
                {tier.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.positionGroup)}
          onValueChange={(value) => onFiltersChange({ positionGroup: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Positie" />
          </SelectTrigger>
          <SelectContent>
            {positionGroups.map((pos) => (
              <SelectItem key={pos.value} value={pos.value}>
                {pos.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.minMinutes.toString()}
          onValueChange={(value) =>
            onFiltersChange({ minMinutes: parseInt(value, 10) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Min. minuten" />
          </SelectTrigger>
          <SelectContent>
            {minMinutesOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            <X className="h-4 w-4 mr-1" />
            Filters wissen
          </Button>
        </div>
      )}
    </div>
  );
}
