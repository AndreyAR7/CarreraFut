// Real domestic cup names per country, used instead of a generic "Copa nacional" so trophies read
// like the actual competition you'd win in that country.
const DOMESTIC_CUP_NAME: Record<string, string> = {
  ES: "Copa del Rey",
  EN: "FA Cup",
  DE: "DFB-Pokal",
  IT: "Coppa Italia",
  FR: "Coupe de France",
  PT: "Taça de Portugal",
  NL: "KNVB Beker",
  AR: "Copa Argentina",
  BR: "Copa do Brasil",
  UY: "Copa Uruguay",
  CO: "Copa Colombia",
  CL: "Copa Chile",
  US: "US Open Cup",
  CR: "Copa de Costa Rica",
  JP: "Copa del Emperador",
};

export function domesticCupName(countryCode: string): string {
  return DOMESTIC_CUP_NAME[countryCode] ?? "Copa nacional";
}

export const INDIVIDUAL_AWARDS = {
  BALLON_DOR: "Balón de Oro",
  GOLDEN_BOOT: "Bota de Oro",
  PUSKAS: "Trofeo Puskás",
} as const;
