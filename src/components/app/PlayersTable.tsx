import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TierBadge } from "./TierBadge";
import { PositionBadge } from "./PositionBadge";
import { RatingDisplay } from "./RatingDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Player {
  _id: string;
  name: string;
  age: number | undefined;
  nationality: string | undefined;
  positionGroup: string;
  position: string;
  photoUrl: string | undefined;
  teamId: string;
  teamName: string;
  teamLogoUrl: string | undefined;
  competitionId: string;
  competitionName: string;
  competitionLogoUrl: string | undefined;
  tier: string | undefined;
  minutes: number;
  rating365: number | undefined;
  ratingLast5: number | undefined;
  levelScore: number | undefined;
}

interface PlayersTableProps {
  players: Player[];
  isLoading?: boolean;
  window: "365" | "last5";
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
}

export function PlayersTable({
  players,
  isLoading = false,
  window,
  sorting = [],
  onSortingChange,
}: PlayersTableProps) {
  const columns = useMemo<ColumnDef<Player>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Speler
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.photoUrl ? (
              <img
                src={row.original.photoUrl}
                alt={row.original.name}
                className="w-8 h-8 rounded-full object-cover bg-muted"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                {row.original.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">
                {row.original.position}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "age",
        header: "Leeftijd",
        cell: ({ row }) => row.original.age ?? "-",
      },
      {
        accessorKey: "nationality",
        header: "Nat",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.nationality?.slice(0, 3).toUpperCase() ?? "-"}
          </span>
        ),
      },
      {
        accessorKey: "positionGroup",
        header: "Pos",
        cell: ({ row }) => (
          <PositionBadge positionGroup={row.original.positionGroup} />
        ),
      },
      {
        accessorKey: "teamName",
        header: "Team",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.teamLogoUrl && (
              <img
                src={row.original.teamLogoUrl}
                alt=""
                className="w-5 h-5 object-contain"
              />
            )}
            <span className="truncate max-w-[120px]">{row.original.teamName}</span>
          </div>
        ),
      },
      {
        accessorKey: "competitionName",
        header: "Competitie",
        cell: ({ row }) => (
          <span className="truncate max-w-[120px] text-muted-foreground">
            {row.original.competitionName}
          </span>
        ),
      },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => <TierBadge tier={row.original.tier} />,
      },
      {
        accessorKey: "minutes",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Min
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-sm">{row.original.minutes}</span>
        ),
      },
      {
        accessorKey: window === "365" ? "rating365" : "ratingLast5",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <RatingDisplay
            rating={window === "365" ? row.original.rating365 : row.original.ratingLast5}
            size="sm"
          />
        ),
      },
      {
        accessorKey: "levelScore",
        header: "Level",
        cell: ({ row }) => (
          <RatingDisplay rating={row.original.levelScore} size="sm" />
        ),
      },
    ],
    [window]
  );

  const table = useReactTable({
    data: players,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: onSortingChange
      ? (updater) => {
          const newSorting = typeof updater === "function" ? updater(sorting) : updater;
          onSortingChange(newSorting);
        }
      : undefined,
    manualSorting: true,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={cell.id}>
                    {index === 0 ? (
                      <Link
                        to="/players/$playerId"
                        params={{ playerId: row.original._id }}
                        className="block"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    ) : (
                      <Link
                        to="/players/$playerId"
                        params={{ playerId: row.original._id }}
                        className="block"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Geen spelers gevonden
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
