import { INDIVIDUAL_AWARDS } from "@/lib/game/data/awards";
import { TrophyTier } from "@/lib/game/types";

// Real trophy/award photos the user sourced and asked to have background-removed and placed
// into the project (see public/trophies/CREDITS.md for provenance/licensing notes). Trophy
// `name` strings are built in careerEngine.ts as "<competition> (<club>)" or "<award> — <league>",
// so we match on a known prefix rather than needing extra props threaded through every call site.
export const REAL_TROPHY_IMAGES: Record<string, string> = {
  WORLD: "/trophies/mundial-fifa.png",
  BALLON_DOR: "/trophies/balon-de-oro.png",
  GOLDEN_BOOT: "/trophies/bota-de-oro.png",
  PUSKAS: "/trophies/trofeo-puskas.png",
  LEAGUE_CR: "/trophies/primera-division-cr.png",
  CUP_ES: "/trophies/copa-del-rey.png",
  CONTINENTAL_UEFA: "/trophies/champions-league.png",
  CONTINENTAL_CONMEBOL: "/trophies/copa-libertadores.png",
  CONTINENTAL_CONCACAF: "/trophies/concacaf-champions-cup.png",
};

function realTrophyKey(tier: TrophyTier, name?: string): string | null {
  if (!name) return tier === "WORLD" ? "WORLD" : null;
  if (tier === "WORLD") return "WORLD";
  if (tier === "INDIVIDUAL") {
    if (name.startsWith(INDIVIDUAL_AWARDS.BALLON_DOR)) return "BALLON_DOR";
    if (name.startsWith(INDIVIDUAL_AWARDS.GOLDEN_BOOT)) return "GOLDEN_BOOT";
    if (name.startsWith(INDIVIDUAL_AWARDS.PUSKAS)) return "PUSKAS";
    return null;
  }
  if (tier === "LEAGUE" && name.startsWith("Liga Promérica")) return "LEAGUE_CR";
  if (tier === "DOMESTIC_CUP" && name.startsWith("Copa del Rey")) return "CUP_ES";
  if (tier === "CONTINENTAL") {
    if (name.startsWith("Champions League")) return "CONTINENTAL_UEFA";
    if (name.startsWith("Copa Libertadores")) return "CONTINENTAL_CONMEBOL";
    if (name.startsWith("Liga de Campeones Concacaf")) return "CONTINENTAL_CONCACAF";
    return null;
  }
  return null;
}

export function realTrophySrc(tier: TrophyTier, name?: string): string | undefined {
  const key = realTrophyKey(tier, name);
  return key ? REAL_TROPHY_IMAGES[key] : undefined;
}
