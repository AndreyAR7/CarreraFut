import { Attributes, STAT_KEYS } from "./types";

export function applyAgeCurve(attributes: Attributes, age: number): Attributes {
  const next = { ...attributes };
  let growthPace: number;
  let growthOther: number;

  if (age <= 20) {
    growthPace = 3;
    growthOther = 2;
  } else if (age <= 24) {
    growthPace = 2;
    growthOther = 2;
  } else if (age <= 29) {
    growthPace = 0;
    growthOther = 1;
  } else if (age <= 32) {
    growthPace = -2;
    growthOther = 0;
  } else if (age <= 35) {
    growthPace = -4;
    growthOther = -1;
  } else {
    growthPace = -6;
    growthOther = -3;
  }

  for (const key of STAT_KEYS) {
    const base = key === "pace" || key === "physical" ? growthPace : growthOther;
    const noise = Math.random() < 0.5 ? 0 : 1;
    next[key] = Math.max(1, Math.min(99, Math.round(next[key] + base + noise)));
  }

  return next;
}
