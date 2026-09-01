import { Attributes, Position, PositionProfile, STAT_KEYS } from "./types";

export const POSITION_PROFILES: Record<Position, PositionProfile> = {
  POR: {
    weights: { pace: 0.05, shooting: 0.02, passing: 0.13, defense: 0.3, physical: 0.2, mentality: 0.3 },
    scoreWeight: 0,
    assistWeight: 0.02,
    defensiveWeight: 1,
  },
  DFC: {
    weights: { pace: 0.1, shooting: 0.05, passing: 0.1, defense: 0.4, physical: 0.25, mentality: 0.1 },
    scoreWeight: 0.06,
    assistWeight: 0.12,
    defensiveWeight: 0.9,
  },
  LI: {
    weights: { pace: 0.25, shooting: 0.05, passing: 0.2, defense: 0.3, physical: 0.1, mentality: 0.1 },
    scoreWeight: 0.1,
    assistWeight: 0.35,
    defensiveWeight: 0.6,
  },
  LD: {
    weights: { pace: 0.25, shooting: 0.05, passing: 0.2, defense: 0.3, physical: 0.1, mentality: 0.1 },
    scoreWeight: 0.1,
    assistWeight: 0.35,
    defensiveWeight: 0.6,
  },
  MCD: {
    weights: { pace: 0.05, shooting: 0.05, passing: 0.25, defense: 0.3, physical: 0.15, mentality: 0.2 },
    scoreWeight: 0.15,
    assistWeight: 0.35,
    defensiveWeight: 0.55,
  },
  MC: {
    weights: { pace: 0.1, shooting: 0.1, passing: 0.3, defense: 0.1, physical: 0.15, mentality: 0.25 },
    scoreWeight: 0.3,
    assistWeight: 0.5,
    defensiveWeight: 0.3,
  },
  MI: {
    weights: { pace: 0.25, shooting: 0.15, passing: 0.25, defense: 0.1, physical: 0.1, mentality: 0.15 },
    scoreWeight: 0.45,
    assistWeight: 0.6,
    defensiveWeight: 0.15,
  },
  MD: {
    weights: { pace: 0.25, shooting: 0.15, passing: 0.25, defense: 0.1, physical: 0.1, mentality: 0.15 },
    scoreWeight: 0.45,
    assistWeight: 0.6,
    defensiveWeight: 0.15,
  },
  MCO: {
    weights: { pace: 0.15, shooting: 0.25, passing: 0.3, defense: 0.05, physical: 0.05, mentality: 0.2 },
    scoreWeight: 0.55,
    assistWeight: 0.75,
    defensiveWeight: 0.05,
  },
  EI: {
    weights: { pace: 0.3, shooting: 0.25, passing: 0.2, defense: 0.05, physical: 0.05, mentality: 0.15 },
    scoreWeight: 0.65,
    assistWeight: 0.7,
    defensiveWeight: 0.05,
  },
  ED: {
    weights: { pace: 0.3, shooting: 0.25, passing: 0.2, defense: 0.05, physical: 0.05, mentality: 0.15 },
    scoreWeight: 0.65,
    assistWeight: 0.7,
    defensiveWeight: 0.05,
  },
  DC: {
    weights: { pace: 0.25, shooting: 0.4, passing: 0.05, defense: 0.01, physical: 0.14, mentality: 0.15 },
    scoreWeight: 1,
    assistWeight: 0.3,
    defensiveWeight: 0.02,
  },
};

export function clampStat(value: number): number {
  return Math.max(1, Math.min(99, Math.round(value)));
}

export function computeOverall(attributes: Attributes, position: Position): number {
  const profile = POSITION_PROFILES[position];
  const total = STAT_KEYS.reduce(
    (sum, key) => sum + attributes[key] * profile.weights[key],
    0,
  );
  return clampStat(total);
}

export function applyStatDeltas(
  attributes: Attributes,
  deltas: Partial<Attributes>,
): Attributes {
  const next = { ...attributes };
  for (const key of STAT_KEYS) {
    if (deltas[key] !== undefined) {
      next[key] = clampStat(next[key] + (deltas[key] as number));
    }
  }
  return next;
}

const STARTING_POINTS = 240;

export function buildStartingAttributes(position: Position): Attributes {
  const profile = POSITION_PROFILES[position];
  const base: Attributes = {
    pace: 30,
    shooting: 30,
    passing: 30,
    defense: 30,
    physical: 30,
    mentality: 30,
  };
  const extra = STARTING_POINTS - STAT_KEYS.reduce((s, k) => s + base[k], 0);
  for (const key of STAT_KEYS) {
    base[key] += Math.round(extra * profile.weights[key]);
  }
  for (const key of STAT_KEYS) {
    base[key] = clampStat(base[key]);
  }
  return base;
}

export function marketValueFromOverall(overall: number, age: number): number {
  const ageFactor = age <= 24 ? 1.15 : age <= 29 ? 1 : age <= 33 ? 0.65 : 0.3;
  const base = Math.pow(Math.max(overall - 35, 1), 2.55) * 40;
  return Math.max(20000, Math.round((base * ageFactor) / 1000) * 1000);
}
