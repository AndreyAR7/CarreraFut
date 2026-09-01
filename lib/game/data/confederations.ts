export type Confederation = "UEFA" | "CONMEBOL" | "CONCACAF" | "AFC";

// Maps a club's country code to its continental confederation, so the trophy you actually win
// for playing "continental" football matches where you play — a Champions League for a European
// giant, a Libertadores for a South American one, not one generic "Copa continental" for everyone.
const CONFEDERATION_BY_COUNTRY: Record<string, Confederation> = {
  ES: "UEFA",
  EN: "UEFA",
  DE: "UEFA",
  IT: "UEFA",
  FR: "UEFA",
  PT: "UEFA",
  NL: "UEFA",
  AR: "CONMEBOL",
  BR: "CONMEBOL",
  UY: "CONMEBOL",
  CO: "CONMEBOL",
  CL: "CONMEBOL",
  US: "CONCACAF",
  CR: "CONCACAF",
  JP: "AFC",
};

export const CONTINENTAL_TROPHY_NAME: Record<Confederation, string> = {
  UEFA: "Champions League",
  CONMEBOL: "Copa Libertadores",
  CONCACAF: "Liga de Campeones Concacaf",
  AFC: "Liga de Campeones de la AFC",
};

export function confederationForCountryCode(countryCode: string): Confederation {
  return CONFEDERATION_BY_COUNTRY[countryCode] ?? "UEFA";
}

export function continentalTrophyName(countryCode: string): string {
  return CONTINENTAL_TROPHY_NAME[confederationForCountryCode(countryCode)];
}

export function countryCodesInConfederation(target: Confederation): string[] {
  return Object.entries(CONFEDERATION_BY_COUNTRY)
    .filter(([, conf]) => conf === target)
    .map(([code]) => code);
}
