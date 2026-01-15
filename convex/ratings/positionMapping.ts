/**
 * Position Group Mapping
 *
 * Maps raw position strings from various sources to canonical position groups.
 */

import type { PositionGroup } from "../lib/metrics";

// ============================================================================
// Position Mappings
// ============================================================================

// Map of lowercase position strings to position groups
const POSITION_MAP: Record<string, PositionGroup> = {
  // Goalkeepers
  goalkeeper: "GK",
  gk: "GK",
  g: "GK",
  keeper: "GK",
  portero: "GK",
  gardien: "GK",
  torwart: "GK",

  // Defenders
  defender: "DEF",
  "centre-back": "DEF",
  "center-back": "DEF",
  cb: "DEF",
  centreback: "DEF",
  centerback: "DEF",
  "left-back": "DEF",
  "right-back": "DEF",
  lb: "DEF",
  rb: "DEF",
  leftback: "DEF",
  rightback: "DEF",
  "left back": "DEF",
  "right back": "DEF",
  fullback: "DEF",
  "full-back": "DEF",
  "wing-back": "DEF",
  wingback: "DEF",
  lwb: "DEF",
  rwb: "DEF",
  "left wing-back": "DEF",
  "right wing-back": "DEF",
  sweeper: "DEF",
  libero: "DEF",
  defensor: "DEF",
  défenseur: "DEF",
  verteidiger: "DEF",

  // Midfielders
  midfielder: "MID",
  midfield: "MID",
  mf: "MID",
  "central midfield": "MID",
  "central midfielder": "MID",
  cm: "MID",
  "defensive midfield": "MID",
  "defensive midfielder": "MID",
  dm: "MID",
  dmf: "MID",
  cdm: "MID",
  "holding midfielder": "MID",
  "attacking midfield": "MID",
  "attacking midfielder": "MID",
  am: "MID",
  amf: "MID",
  cam: "MID",
  "left midfield": "MID",
  "right midfield": "MID",
  lm: "MID",
  rm: "MID",
  "left winger": "MID",
  "right winger": "MID",
  lw: "MID",
  rw: "MID",
  winger: "MID",
  wing: "MID",
  mediocampista: "MID",
  milieu: "MID",
  mittelfeldspieler: "MID",

  // Attackers
  attacker: "ATT",
  attack: "ATT",
  forward: "ATT",
  striker: "ATT",
  st: "ATT",
  fw: "ATT",
  cf: "ATT",
  "centre-forward": "ATT",
  "center-forward": "ATT",
  centreforward: "ATT",
  centerforward: "ATT",
  "second striker": "ATT",
  ss: "ATT",
  "false 9": "ATT",
  false9: "ATT",
  "left forward": "ATT",
  "right forward": "ATT",
  lf: "ATT",
  rf: "ATT",
  delantero: "ATT",
  attaquant: "ATT",
  stürmer: "ATT",
  angreifer: "ATT",
};

// ============================================================================
// Mapping Functions
// ============================================================================

/**
 * Map a raw position string to a canonical position group
 * Returns undefined if position cannot be mapped
 */
export function mapPositionToGroup(position: string): PositionGroup | undefined {
  if (!position) return undefined;

  const normalized = position.toLowerCase().trim();

  // Direct match
  if (POSITION_MAP[normalized]) {
    return POSITION_MAP[normalized];
  }

  // Partial match - check if any key is contained in the position
  for (const [key, group] of Object.entries(POSITION_MAP)) {
    if (normalized.includes(key)) {
      return group;
    }
  }

  // Fallback patterns
  if (normalized.includes("goal") || normalized.includes("keeper")) {
    return "GK";
  }
  if (normalized.includes("defend") || normalized.includes("back")) {
    return "DEF";
  }
  if (normalized.includes("mid") || normalized.includes("wing")) {
    return "MID";
  }
  if (
    normalized.includes("forward") ||
    normalized.includes("attack") ||
    normalized.includes("strik")
  ) {
    return "ATT";
  }

  return undefined;
}

/**
 * Map a raw position string to a canonical position group
 * Returns a default if position cannot be mapped
 */
export function mapPositionToGroupWithDefault(
  position: string,
  defaultGroup: PositionGroup = "MID"
): PositionGroup {
  return mapPositionToGroup(position) ?? defaultGroup;
}

/**
 * Validate that a value is a valid position group
 */
export function isValidPositionGroup(value: string): value is PositionGroup {
  return ["GK", "DEF", "MID", "ATT"].includes(value);
}
