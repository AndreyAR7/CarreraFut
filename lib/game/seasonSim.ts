import { POSITION_PROFILES } from "./attributes";
import { Attributes, Position } from "./types";

export type LeagueResult = "CAMPEON" | "SUBCAMPEON" | "TOP4" | "MEDIA_TABLA" | "DESCENSO";
export type CupResult = "CAMPEON" | "FINAL" | "SEMIS" | "CUARTOS" | "ELIMINADO_TEMPRANO";

export interface SeasonSimInput {
  position: Position;
  attributes: Attributes;
  overall: number;
  clubReputation: number;
  matchesPerSeason: number;
  starterShare: number;
  fitness: number;
  morale: number;
  playsContinental: boolean;
}

export interface SeasonSimResult {
  matchesPlayed: number;
  goals: number;
  assists: number;
  avgRating: number;
  leagueResult: LeagueResult;
  leagueTitleWon: boolean;
  cupResult: CupResult;
  cupTitleWon: boolean;
  continentalResult: CupResult | null;
  continentalTitleWon: boolean;
}

function poisson(lambda: number): number {
  if (lambda <= 0) return 0;
  const limit = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > limit);
  return k - 1;
}

function normalNoise(stdDev: number): number {
  const u1 = Math.max(Math.random(), 1e-9);
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z * stdDev;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function simulateBracket(winProb: number, rounds: number): { reached: number; won: boolean } {
  let reached = 0;
  for (let i = 0; i < rounds; i++) {
    if (Math.random() < winProb) {
      reached++;
    } else {
      break;
    }
  }
  return { reached, won: reached === rounds };
}

const CUP_STAGE_LABELS: CupResult[] = [
  "ELIMINADO_TEMPRANO",
  "CUARTOS",
  "SEMIS",
  "FINAL",
  "CAMPEON",
];

function cupResultFromReached(reached: number): CupResult {
  return CUP_STAGE_LABELS[Math.min(reached, CUP_STAGE_LABELS.length - 1)];
}

export function simulateSeason(input: SeasonSimInput): SeasonSimResult {
  const profile = POSITION_PROFILES[input.position];
  const fitnessFactor = 0.7 + 0.3 * (input.fitness / 100);
  const matchesPlayed = Math.max(
    0,
    Math.round(input.matchesPerSeason * input.starterShare * fitnessFactor),
  );

  const attackRating =
    input.attributes.shooting * 0.55 +
    input.attributes.pace * 0.25 +
    input.attributes.mentality * 0.2;
  const passRating =
    input.attributes.passing * 0.6 +
    input.attributes.mentality * 0.25 +
    input.attributes.pace * 0.15;

  const moraleFactor = 0.85 + 0.3 * (input.morale / 100);

  const perMatchGoalRate = profile.scoreWeight * (attackRating / 99) * 0.75 * moraleFactor;
  const perMatchAssistRate = profile.assistWeight * (passRating / 99) * 0.6 * moraleFactor;

  const goals = poisson(perMatchGoalRate * matchesPlayed);
  const assists = poisson(perMatchAssistRate * matchesPlayed);

  const avgRating = clamp(
    5.6 +
      (input.overall - 50) / 22 +
      (matchesPlayed > 0 ? ((goals + assists * 0.7) / matchesPlayed) * 0.9 : 0) +
      normalNoise(0.22),
    4.0,
    9.8,
  );

  const teamBoost = clamp((input.overall - (input.clubReputation * 18 + 10)) / 40, -0.5, 0.5);
  const effectiveStrength = input.clubReputation + teamBoost;
  const tableRoll = effectiveStrength + normalNoise(1.2);

  let leagueResult: LeagueResult;
  if (tableRoll >= 6.2) leagueResult = "CAMPEON";
  else if (tableRoll >= 5.2) leagueResult = "SUBCAMPEON";
  else if (tableRoll >= 3.8) leagueResult = "TOP4";
  else if (tableRoll >= 2.2) leagueResult = "MEDIA_TABLA";
  else leagueResult = "DESCENSO";

  const domesticWinProb = clamp(0.35 + effectiveStrength * 0.09, 0.15, 0.85);
  const domesticBracket = simulateBracket(domesticWinProb, 4);
  const cupResult = cupResultFromReached(domesticBracket.reached);

  let continentalResult: CupResult | null = null;
  let continentalTitleWon = false;
  if (input.playsContinental) {
    const continentalWinProb = clamp(domesticWinProb - 0.08, 0.1, 0.75);
    const continentalBracket = simulateBracket(continentalWinProb, 4);
    continentalResult = cupResultFromReached(continentalBracket.reached);
    continentalTitleWon = continentalBracket.won;
  }

  return {
    matchesPlayed,
    goals,
    assists,
    avgRating: Math.round(avgRating * 100) / 100,
    leagueResult,
    leagueTitleWon: leagueResult === "CAMPEON",
    cupResult,
    cupTitleWon: domesticBracket.won,
    continentalResult,
    continentalTitleWon,
  };
}

export interface NationalTeamSimInput {
  age: number;
  overall: number;
  attributes: Attributes;
  position: Position;
  reputation: number;
  countryFootballPower: number;
  alreadyCapped: boolean;
  isMajorTournamentYear: boolean;
}

export interface NationalTeamSimResult {
  calledUp: boolean;
  caps: number;
  goals: number;
  assists: number;
  playedMajorTournament: boolean;
  wonMajorTournament: boolean;
}

// Chance that, in a major-tournament year, the national team's run comes down to a decisive
// penalty shootout the player gets a say in — separate from (and rarer than) simply winning it.
export function decisiveShootoutChance(input: { overall: number; countryFootballPower: number }): number {
  return clamp((input.countryFootballPower / 5) * 0.35 + (input.overall - 65) / 180, 0.05, 0.55);
}

export function simulateNationalTeamSeason(
  input: NationalTeamSimInput,
): NationalTeamSimResult {
  const callUpProb = clamp(
    ((input.overall - 60) / 40) * 0.6 +
      (input.reputation / 100) * 0.2 +
      (input.alreadyCapped ? 0.3 : 0),
    0,
    0.97,
  );

  if (Math.random() >= callUpProb) {
    return {
      calledUp: false,
      caps: 0,
      goals: 0,
      assists: 0,
      playedMajorTournament: false,
      wonMajorTournament: false,
    };
  }

  const profile = POSITION_PROFILES[input.position];
  const caps = 1 + Math.floor(Math.random() * 6);
  const attackRating =
    input.attributes.shooting * 0.55 +
    input.attributes.pace * 0.25 +
    input.attributes.mentality * 0.2;
  const passRating =
    input.attributes.passing * 0.6 +
    input.attributes.mentality * 0.25 +
    input.attributes.pace * 0.15;

  const goals = poisson(caps * profile.scoreWeight * (attackRating / 99) * 0.4);
  const assists = poisson(caps * profile.assistWeight * (passRating / 99) * 0.35);

  let wonMajorTournament = false;
  if (input.isMajorTournamentYear) {
    const winProb = clamp(
      (input.countryFootballPower / 5) * 0.28 + (input.overall - 70) / 200,
      0.02,
      0.35,
    );
    wonMajorTournament = Math.random() < winProb;
  }

  return {
    calledUp: true,
    caps,
    goals,
    assists,
    playedMajorTournament: input.isMajorTournamentYear,
    wonMajorTournament,
  };
}
