import { v } from "convex/values";
import { query } from "./_generated/server";
import { positionGroupValidator, tierValidator } from "./schema";
import type { Doc, Id } from "./_generated/dataModel";

// Window type for rating selection
const windowValidator = v.union(v.literal("365"), v.literal("last5"));

// Sort options
const sortValidator = v.union(
  v.literal("rating"),
  v.literal("minutes"),
  v.literal("age"),
  v.literal("name")
);

/**
 * List players with filters, pagination, and sorting
 */
export const list = query({
  args: {
    search: v.optional(v.string()),
    country: v.optional(v.string()),
    competitionId: v.optional(v.id("competitions")),
    tier: v.optional(tierValidator),
    positionGroup: v.optional(positionGroupValidator),
    minMinutes: v.optional(v.number()),
    ageMin: v.optional(v.number()),
    ageMax: v.optional(v.number()),
    window: v.optional(windowValidator),
    sort: v.optional(sortValidator),
    sortDesc: v.optional(v.boolean()),
    page: v.optional(v.number()),
    pageSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const minMinutes = args.minMinutes ?? 300;
    const window = args.window ?? "365";
    const sort = args.sort ?? "rating";
    const sortDesc = args.sortDesc ?? true;
    const page = args.page ?? 1;
    const pageSize = Math.min(args.pageSize ?? 25, 100);

    // Fetch players - use index if filtering by competition
    let players: Doc<"players">[];
    if (args.competitionId) {
      players = await ctx.db
        .query("players")
        .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId!))
        .collect();
    } else {
      players = await ctx.db.query("players").collect();
    }

    // Get all related data in batch
    const [teams, competitions, rollingStats, playerRatings, competitionRatings] =
      await Promise.all([
        ctx.db.query("teams").collect(),
        ctx.db.query("competitions").collect(),
        ctx.db.query("playerRollingStats").collect(),
        ctx.db.query("playerRatings").collect(),
        ctx.db.query("competitionRatings").collect(),
      ]);

    // Create lookup maps
    const teamsMap = new Map(teams.map((t) => [t._id, t]));
    const competitionsMap = new Map(competitions.map((c) => [c._id, c]));
    const competitionRatingsMap = new Map(
      competitionRatings.map((r) => [r.competitionId, r])
    );

    // Create maps for player data
    const rollingStatsMap = new Map<string, Doc<"playerRollingStats">>();
    for (const stat of rollingStats) {
      rollingStatsMap.set(stat.playerId, stat);
    }

    const playerRatingsMap = new Map<string, Doc<"playerRatings">>();
    for (const rating of playerRatings) {
      playerRatingsMap.set(rating.playerId, rating);
    }

    // Apply filters
    let filtered = players.filter((player) => {
      // Search filter
      if (args.search) {
        const searchLower = args.search.toLowerCase();
        if (!player.name.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Position group filter
      if (args.positionGroup) {
        if (player.positionGroup !== args.positionGroup) {
          return false;
        }
      }

      // Country filter (via competition)
      if (args.country) {
        const competition = competitionsMap.get(player.competitionId);
        if (!competition || competition.country !== args.country) {
          return false;
        }
      }

      // Tier filter (via competition or competition rating)
      if (args.tier) {
        const competition = competitionsMap.get(player.competitionId);
        const compRating = competitionRatingsMap.get(player.competitionId);
        const tier = competition?.tier ?? compRating?.tier;
        if (tier !== args.tier) {
          return false;
        }
      }

      // Minutes filter
      const stats = rollingStatsMap.get(player._id);
      if (stats && stats.minutes < minMinutes) {
        return false;
      }

      // Age filters
      if (player.age !== undefined) {
        if (args.ageMin !== undefined && player.age < args.ageMin) {
          return false;
        }
        if (args.ageMax !== undefined && player.age > args.ageMax) {
          return false;
        }
      }

      return true;
    });

    // Enrich with team, competition, and rating data
    type EnrichedPlayer = {
      _id: Id<"players">;
      name: string;
      age: number | undefined;
      nationality: string | undefined;
      positionGroup: string;
      position: string;
      photoUrl: string | undefined;
      teamId: Id<"teams">;
      teamName: string;
      teamLogoUrl: string | undefined;
      competitionId: Id<"competitions">;
      competitionName: string;
      competitionLogoUrl: string | undefined;
      tier: string | undefined;
      minutes: number;
      rating365: number | undefined;
      ratingLast5: number | undefined;
      levelScore: number | undefined;
    };

    const enriched: EnrichedPlayer[] = filtered.map((player) => {
      const team = teamsMap.get(player.teamId);
      const competition = competitionsMap.get(player.competitionId);
      const compRating = competitionRatingsMap.get(player.competitionId);
      const stats = rollingStatsMap.get(player._id);
      const rating = playerRatingsMap.get(player._id);

      return {
        _id: player._id,
        name: player.name,
        age: player.age,
        nationality: player.nationality,
        positionGroup: player.positionGroup,
        position: player.position,
        photoUrl: player.photoUrl,
        teamId: player.teamId,
        teamName: team?.name ?? "Unknown",
        teamLogoUrl: team?.logoUrl,
        competitionId: player.competitionId,
        competitionName: competition?.name ?? "Unknown",
        competitionLogoUrl: competition?.logoUrl,
        tier: competition?.tier ?? compRating?.tier,
        minutes: stats?.minutes ?? 0,
        rating365: rating?.rating365,
        ratingLast5: rating?.ratingLast5,
        levelScore: rating?.levelScore,
      };
    });

    // Sort
    enriched.sort((a, b) => {
      let comparison = 0;

      switch (sort) {
        case "rating":
          const ratingA = window === "365" ? a.rating365 : a.ratingLast5;
          const ratingB = window === "365" ? b.rating365 : b.ratingLast5;
          comparison = (ratingB ?? 0) - (ratingA ?? 0);
          break;
        case "minutes":
          comparison = b.minutes - a.minutes;
          break;
        case "age":
          comparison = (a.age ?? 99) - (b.age ?? 99);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
      }

      return sortDesc ? comparison : -comparison;
    });

    // Paginate
    const totalCount = enriched.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedPlayers = enriched.slice(startIndex, startIndex + pageSize);

    return {
      players: paginatedPlayers,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },
});

/**
 * Get a single player with full details
 */
export const get = query({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return null;

    // Get related data
    const [team, competition] = await Promise.all([
      ctx.db.get(player.teamId),
      ctx.db.get(player.competitionId),
    ]);

    // Get competition rating for tier
    const competitionRatings = await ctx.db
      .query("competitionRatings")
      .collect();
    const compRating = competitionRatings.find(
      (r) => r.competitionId === player.competitionId
    );

    // Get player rolling stats
    const rollingStats = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId)
      )
      .first();

    // Get player rating
    const playerRatings = await ctx.db.query("playerRatings").collect();
    const rating = playerRatings.find((r) => r.playerId === args.playerId);

    // Get last 5 appearances
    const appearances = await ctx.db
      .query("appearances")
      .withIndex("by_player_date", (q) => q.eq("playerId", args.playerId))
      .order("desc")
      .take(5);

    return {
      _id: player._id,
      name: player.name,
      age: player.age,
      birthDate: player.birthDate,
      nationality: player.nationality,
      positionGroup: player.positionGroup,
      position: player.position,
      photoUrl: player.photoUrl,
      team: team
        ? {
            _id: team._id,
            name: team.name,
            logoUrl: team.logoUrl,
          }
        : null,
      competition: competition
        ? {
            _id: competition._id,
            name: competition.name,
            country: competition.country,
            logoUrl: competition.logoUrl,
            tier: competition.tier ?? compRating?.tier,
          }
        : null,
      stats: rollingStats
        ? {
            minutes: rollingStats.minutes,
            fromDate: rollingStats.fromDate,
            toDate: rollingStats.toDate,
            totals: rollingStats.totals,
            per90: rollingStats.per90,
            last5: rollingStats.last5,
          }
        : null,
      rating: rating
        ? {
            rating365: rating.rating365,
            ratingLast5: rating.ratingLast5,
            levelScore: rating.levelScore,
            tier: rating.tier,
          }
        : null,
      recentAppearances: appearances.map((app) => ({
        _id: app._id,
        matchDate: app.matchDate,
        minutes: app.minutes,
        stats: app.stats,
      })),
    };
  },
});
