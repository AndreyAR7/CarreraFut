export type StatKey =
  | "pace"
  | "shooting"
  | "passing"
  | "defense"
  | "physical"
  | "mentality";

export const STAT_KEYS: StatKey[] = [
  "pace",
  "shooting",
  "passing",
  "defense",
  "physical",
  "mentality",
];

export const STAT_LABELS: Record<StatKey, string> = {
  pace: "Ritmo",
  shooting: "Tiro",
  passing: "Pase",
  defense: "Defensa",
  physical: "Físico",
  mentality: "Mentalidad",
};

export type Position =
  | "POR"
  | "DFC"
  | "LI"
  | "LD"
  | "MCD"
  | "MC"
  | "MI"
  | "MD"
  | "MCO"
  | "EI"
  | "ED"
  | "DC";

export const POSITIONS: Position[] = [
  "POR",
  "DFC",
  "LI",
  "LD",
  "MCD",
  "MC",
  "MI",
  "MD",
  "MCO",
  "EI",
  "ED",
  "DC",
];

export const POSITION_LABELS: Record<Position, string> = {
  POR: "Arquero",
  DFC: "Defensor central",
  LI: "Lateral izquierdo",
  LD: "Lateral derecho",
  MCD: "Mediocampista defensivo",
  MC: "Mediocampista central",
  MI: "Interior izquierdo",
  MD: "Interior derecho",
  MCO: "Enganche / mediapunta",
  EI: "Extremo izquierdo",
  ED: "Extremo derecho",
  DC: "Delantero centro",
};

export type Foot = "IZQUIERDA" | "DERECHA";

export type Difficulty = "INTENSA" | "NORMAL" | "EXPRESS";

export const DIFFICULTY_INFO: Record<
  Difficulty,
  { label: string; description: string; seasonsPerDecision: number }
> = {
  INTENSA: {
    label: "Intensa",
    description: "Una decisión por temporada. Inmersión total.",
    seasonsPerDecision: 1,
  },
  NORMAL: {
    label: "Normal",
    description: "Decisiones cada 2 temporadas, experiencia equilibrada.",
    seasonsPerDecision: 2,
  },
  EXPRESS: {
    label: "Exprés",
    description: "Menos decisiones, avanzás tu carrera más rápido.",
    seasonsPerDecision: 3,
  },
};

export type CareerStatus = "ACTIVE" | "RETIRED";

export type TrophyTier =
  | "LEAGUE"
  | "DOMESTIC_CUP"
  | "CONTINENTAL"
  | "WORLD"
  | "INDIVIDUAL";

export const TROPHY_LABELS: Record<TrophyTier, string> = {
  LEAGUE: "Liga",
  DOMESTIC_CUP: "Copa nacional",
  CONTINENTAL: "Copa continental",
  WORLD: "Mundial",
  INDIVIDUAL: "Premio individual",
};

export interface Attributes {
  pace: number;
  shooting: number;
  passing: number;
  defense: number;
  physical: number;
  mentality: number;
}

export interface PositionProfile {
  weights: Attributes;
  scoreWeight: number;
  assistWeight: number;
  defensiveWeight: number;
}

export type EventCategory =
  | "DISCIPLINA"
  | "SALUD"
  | "ENTRENAMIENTO"
  | "PERSONAL"
  | "MEDIA"
  | "SELECCION"
  | "FINANZAS"
  | "CLUB";

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  DISCIPLINA: "Disciplina",
  SALUD: "Salud",
  ENTRENAMIENTO: "Entrenamiento",
  PERSONAL: "Vida personal",
  MEDIA: "Imagen y medios",
  SELECCION: "Selección nacional",
  FINANZAS: "Finanzas",
  CLUB: "Definición decisiva",
};

export interface EventEffects {
  statDeltas?: Partial<Attributes>;
  moraleDelta?: number;
  fitnessDelta?: number;
  marketValueMultiplier?: number;
  suspensionMatches?: number;
  injuryWeeks?: number;
  reputationDelta?: number;
  starterShareDelta?: number;
  /** Only used by the World Cup penalty-shootout decision — awards a WORLD trophy on resolution. */
  awardsWorldCup?: boolean;
  /** Only used by the Champions League penalty-shootout decision — awards a CONTINENTAL trophy. */
  awardsContinentalTitle?: boolean;
  /** Only used by the domestic cup final penalty-shootout decision — awards a DOMESTIC_CUP trophy. */
  awardsDomesticCupTitle?: boolean;
  /** Only used by the signing-trial penalty-shootout decision — moves the player to a better club. */
  promotesToBetterClub?: boolean;
  /**
   * A risky choice that isn't punished immediately — names the follow-up event key to force onto
   * the career 2-3 decisions later (see pendingScandalKey/pendingScandalSeasonsLeft), instead of
   * an EventEffects consequence applied right away.
   */
  scandalFollowupKey?: string;
  /** Only used by a scandal's follow-up event — forces the player out to a worse club. */
  forcesDemotionScandal?: boolean;
}

export interface EventOutcome {
  id: string;
  chance: number;
  summary: string;
  effects: EventEffects;
}

export interface EventOption {
  key: string;
  label: string;
  description: string;
  outcomes: EventOutcome[];
}

export interface EventDefinition {
  key: string;
  category: EventCategory;
  title: string;
  description: string;
  minAge: number;
  maxAge: number;
  weight: number;
  options: EventOption[];
  /** Only eligible while playing for a club outside the player's home country. */
  requiresAbroad?: boolean;
}
