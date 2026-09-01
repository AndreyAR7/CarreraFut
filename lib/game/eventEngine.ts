import { EVENTS } from "./data/events";
import { EventDefinition, EventOption, EventOutcome } from "./types";

export interface EventContext {
  age: number;
  excludeKeys?: string[];
  isAbroad?: boolean;
}

export function eligibleEvents(context: EventContext): EventDefinition[] {
  const exclude = new Set(context.excludeKeys ?? []);
  return EVENTS.filter(
    (event) =>
      context.age >= event.minAge &&
      context.age <= event.maxAge &&
      !exclude.has(event.key) &&
      (!event.requiresAbroad || context.isAbroad),
  );
}

export function pickRandomEvent(context: EventContext): EventDefinition | null {
  const pool = eligibleEvents(context);
  if (pool.length === 0) return null;
  const totalWeight = pool.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const event of pool) {
    roll -= event.weight;
    if (roll <= 0) return event;
  }
  return pool[pool.length - 1];
}

export function getEventByKey(key: string): EventDefinition | undefined {
  return EVENTS.find((e) => e.key === key);
}

export function getOption(event: EventDefinition, optionKey: string): EventOption | undefined {
  return event.options.find((o) => o.key === optionKey);
}

export function resolveOutcome(option: EventOption): EventOutcome {
  const total = option.outcomes.reduce((sum, o) => sum + o.chance, 0);
  let roll = Math.random() * total;
  for (const outcome of option.outcomes) {
    roll -= outcome.chance;
    if (roll <= 0) return outcome;
  }
  return option.outcomes[option.outcomes.length - 1];
}
