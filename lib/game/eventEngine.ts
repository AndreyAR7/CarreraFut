import { EVENTS } from "./data/events";
import { EventDefinition, EventOption, EventOutcome, Position } from "./types";

export interface EventContext {
  age: number;
  excludeKeys?: string[];
  isAbroad?: boolean;
  /** Event keys this career has already seen — pickRandomEvent avoids repeating them. */
  seenKeys?: Set<string>;
  /** Player's position — filters events with a positions allow-list or excludePositions deny-list. */
  position?: Position;
}

export function eligibleEvents(context: EventContext): EventDefinition[] {
  const exclude = new Set(context.excludeKeys ?? []);
  return EVENTS.filter(
    (event) =>
      context.age >= event.minAge &&
      context.age <= event.maxAge &&
      !exclude.has(event.key) &&
      (!event.requiresAbroad || context.isAbroad) &&
      (!event.positions || (context.position ? event.positions.includes(context.position) : false)) &&
      (!event.excludePositions || !context.position || !event.excludePositions.includes(context.position)),
  );
}

function weightedPick(pool: EventDefinition[]): EventDefinition {
  const totalWeight = pool.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const event of pool) {
    roll -= event.weight;
    if (roll <= 0) return event;
  }
  return pool[pool.length - 1];
}

export function pickRandomEvent(context: EventContext): EventDefinition | null {
  const pool = eligibleEvents(context);
  if (pool.length === 0) return null;

  // Same question shouldn't come up again and again — prefer an event this career hasn't seen
  // yet, only allowing a repeat about 1 in 10 times (and only once the unseen pool is empty does
  // a repeat become unavoidable).
  const seen = context.seenKeys ?? new Set<string>();
  const unseen = pool.filter((event) => !seen.has(event.key));
  const useUnseen = unseen.length > 0 && Math.random() < 0.9;
  return weightedPick(useUnseen ? unseen : pool);
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
