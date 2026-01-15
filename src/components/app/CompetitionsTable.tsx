import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Competition {
  _id: string;
  name: string;
  country: string;
  tier: string | undefined;
  isActive: boolean;
  logoUrl: string | undefined;
  strengthScore: number | undefined;
  playerCount: number;
  season: string;
}

interface CompetitionsTableProps {
  competitions: Competition[];
  isLoading?: boolean;
}

export function CompetitionsTable({
  competitions,
  isLoading = false,
}: CompetitionsTableProps) {
  const columns = useMemo<ColumnDef<Competition>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Competitie",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.logoUrl ? (
              <img
                src={row.original.logoUrl}
                alt=""
                className="w-8 h-8 object-contain"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                {row.original.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">
                {row.original.season}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "country",
        header: "Land",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.country}</span>
        ),
      },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => <TierBadge tier={row.original.tier} />,
      },
      {
        accessorKey: "strengthScore",
        header: "Sterkte",
        cell: ({ row }) =>
          row.original.strengthScore !== undefined ? (
            <span className="font-mono text-sm">
              {row.original.strengthScore.toFixed(1)}
            </span>
          ) : (
            <span className="text-muted-foreground">-</span>
          ),
      },
      {
        accessorKey: "playerCount",
        header: "Spelers",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.playerCount}</Badge>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) =>
          row.original.isActive ? (
            <Badge variant="default" className="bg-green-600">
              Actief
            </Badge>
          ) : (
            <Badge variant="secondary">Inactief</Badge>
          ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: competitions,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
              <TableRow key={row.id} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <Link
                      to="/competitions/$competitionId"
                      params={{ competitionId: row.original._id }}
                      className="block"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Geen competities gevonden
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
