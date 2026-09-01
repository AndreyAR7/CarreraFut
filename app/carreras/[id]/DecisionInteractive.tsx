"use client";

import { useEffect, useRef, useState } from "react";
import { advanceSeasonAction, resolveClubOfferAction, resolveEventAction } from "@/app/actions/career";
import { ClubCrest } from "@/components/ClubCrest";
import { EventIllustration } from "@/components/EventIllustration";
import { Flag } from "@/components/Flag";
import { PenaltyShootout, ShootoutOutcomeKind } from "@/components/PenaltyShootout";
import { ClubOfferOption } from "@/lib/game/clubOffers";
import { crestSrc } from "@/lib/game/data/crestFiles";
import { EffectTone } from "@/lib/game/format";
import { EVENT_CATEGORY_LABELS, EventCategory } from "@/lib/game/types";

export interface EventOutcomePayload {
  id: string;
  chance: number;
  tag: string;
  tone: EffectTone;
  summary: string;
}

export interface EventOptionPayload {
  key: string;
  label: string;
  description: string;
  outcomes: EventOutcomePayload[];
}

export type DecisionState =
  | { type: "offer"; title: string; description: string; age: number; options: ClubOfferOption[] }
  | {
      type: "event";
      title: string;
      description: string;
      age: number;
      category: EventCategory;
      eventKey: string;
      options: EventOptionPayload[];
    }
  | { type: "none" };

const CATEGORY_ICONS: Record<EventCategory, string> = {
  DISCIPLINA: "🟥",
  SALUD: "🏥",
  ENTRENAMIENTO: "🏋️",
  PERSONAL: "🏡",
  MEDIA: "🎙️",
  SELECCION: "🎽",
  FINANZAS: "💰",
  CLUB: "🥅",
};

// Events resolved with the goal-frame penalty animation instead of the generic outcome-chip
// list — every outcome id across these events is one of GOAL/SAVED/MISSED below.
const SHOOTOUT_EVENT_KEYS = new Set(["mundial_penales", "champions_penales", "fichaje_penales"]);
const SHOOTOUT_OUTCOME_KIND: Record<string, ShootoutOutcomeKind> = {
  gol: "GOAL",
  atajada: "SAVED",
  afuera: "MISSED",
};
// A direct-kick option's zone is the player's own choice, not something to randomize — clicking
// "Rematar a la izquierda" IS aiming left, so the goal-zone animation just confirms that pick
// instead of cycling through zones first.
const ZONE_INDEX_BY_KEY: Record<string, number> = { izquierda: 0, centro: 1, derecha: 2 };

const TONE_STYLES: Record<EffectTone, string> = {
  positive: "border-accent/40 bg-accent/12 text-accent",
  negative: "border-danger/40 bg-danger/12 text-danger",
  neutral: "border-border bg-surface text-muted",
};

const TONE_ICONS: Record<EffectTone, string> = {
  positive: "▲",
  negative: "▼",
  neutral: "•",
};

const STARS = "★★★★★";

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// Decelerating "homing" flicker across a fixed number of decorative ticks, landing on the real
// outcome we already have in hand by the time this runs. No Date.now()/Math.random() here on
// purpose — a plain step counter keeps this fine to call from the component (unlike the timing
// helpers this file used to have).
async function spinToIndex(
  n: number,
  targetIndex: number,
  onTick: (index: number) => void,
  isAlive: () => boolean,
): Promise<void> {
  const decorativeTicks = 7;
  const totalSteps = decorativeTicks + (((targetIndex - decorativeTicks) % n) + n) % n;
  for (let step = 0; step <= totalSteps; step++) {
    if (!isAlive()) return;
    onTick(step % n);
    const progress = step / totalSteps;
    await sleep(90 + progress * progress * 260);
  }
  onTick(targetIndex);
}

// Which of the 3 goal zones (left/center/right) the shot animates toward — purely decorative, so
// a plain random pick from an event-handler-called helper (not the component body) is fine.
function pickShotZone(): number {
  return Math.floor(Math.random() * 3);
}

function OutcomeChip({
  outcome,
  highlighted,
  dimmed,
}: {
  outcome: EventOutcomePayload;
  highlighted?: boolean;
  dimmed?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-300 ${TONE_STYLES[outcome.tone]} ${
        highlighted ? "pop-in scale-105 shadow-[0_0_12px_rgba(255,255,255,0.35)] ring-2 ring-white/70" : ""
      } ${dimmed ? "opacity-35 grayscale" : ""}`}
    >
      <span className="text-[10px]">{TONE_ICONS[outcome.tone]}</span>
      <span className="tabular-nums">{Math.round(outcome.chance * 100)}%</span>
      <span className="text-foreground/80">{outcome.tag}</span>
    </div>
  );
}

function DecisionShell({
  banner,
  badge,
  age,
  title,
  description,
  hint,
  children,
}: {
  banner: React.ReactNode;
  badge: React.ReactNode;
  age: number;
  title: string;
  description: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
      <div className="relative h-28">
        {banner}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-4 top-3">{badge}</div>
        <span className="absolute right-4 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          🎂 {age} años
        </span>
        <h2 className="absolute inset-x-4 bottom-3 text-lg font-extrabold text-white drop-shadow">{title}</h2>
      </div>
      <div className="p-5">
        <div className="rounded-xl border-l-4 border-accent bg-surface-alt px-4 py-3">
          <p className="text-[15px] font-semibold leading-snug text-foreground">{description}</p>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted">👉 {hint}</p>
        <div className="mt-5 flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}

type Phase = "idle" | "busy" | "spinning" | "revealed";

export function DecisionInteractive({ careerId, state }: { careerId: string; state: DecisionState }) {
  // React Strict Mode (dev only) mounts every component, cleans it up, then mounts it again to
  // surface effects with missing cleanup. That means the mount phase must reset this to true —
  // setting it only in useRef's initializer left it permanently false after Strict Mode's first
  // simulated unmount, silently short-circuiting every `if (!aliveRef.current) return;` guard
  // below for the rest of the component's life. This bit us for real: every click resolved fine
  // server-side but the UI never updated, because the code bailed out right after `alive` check.
  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const [phase, setPhase] = useState<Phase>("idle");
  const [frozen, setFrozen] = useState<DecisionState | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [spinIndex, setSpinIndex] = useState(0);
  const [result, setResult] = useState<{ outcomeId: string; summary: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const display = phase === "idle" ? state : (frozen ?? state);
  const busy = phase !== "idle";

  // A full reload — not router.refresh() — is deliberate here: this app hit a real bug where
  // repeated soft client-side refreshes raced the Server Action's own revalidation and lost the
  // update, leaving one part of the page fresh and another stuck on stale data. A hard reload
  // always fetches one single, fully consistent server response.
  function reload() {
    if (!aliveRef.current) return;
    window.location.reload();
  }

  async function handleChooseOffer(option: ClubOfferOption) {
    if (phase !== "idle") return;
    setError(null);
    setFrozen(state);
    setActiveKey(option.optionKey);
    setPhase("busy");
    try {
      await resolveClubOfferAction(careerId, option.optionKey);
    } catch (e) {
      console.error("resolveClubOfferAction failed:", e);
    }
    reload();
  }

  async function handleAdvance() {
    if (phase !== "idle") return;
    setError(null);
    setFrozen(state);
    setPhase("busy");
    try {
      await advanceSeasonAction(careerId);
    } catch (e) {
      console.error("advanceSeasonAction failed:", e);
    }
    reload();
  }

  async function handleChooseEvent(option: EventOptionPayload) {
    if (phase !== "idle" || state.type !== "event") return;
    setError(null);
    setFrozen(state);
    setActiveKey(option.key);
    setResult(null);

    const isShootout = SHOOTOUT_EVENT_KEYS.has(state.eventKey);
    // Picking a corner IS the decision — the zone comes straight from which button was clicked,
    // never from randomness. Only a "let a teammate take it" pick still gets a randomized zone,
    // since that shot genuinely isn't the player's to aim.
    const isDirectKick = isShootout && option.key in ZONE_INDEX_BY_KEY;
    const isTeammateShot = isShootout && !isDirectKick && option.outcomes.length > 1;
    const willSpin = isDirectKick || isTeammateShot || option.outcomes.length > 1;

    setPhase(willSpin ? "spinning" : "busy");
    setSpinIndex(isDirectKick ? ZONE_INDEX_BY_KEY[option.key] : 0);

    let resolved;
    try {
      resolved = await resolveEventAction(careerId, option.key);
    } catch (e) {
      console.error("resolveEventAction failed:", e);
      reload();
      return;
    }
    if (!aliveRef.current) return;

    if (isDirectKick) {
      // Zone is already fixed from the click — just a short suspense beat before the reveal.
      await sleep(1300);
      if (!aliveRef.current) return;
    } else if (isTeammateShot) {
      await spinToIndex(3, pickShotZone(), (idx) => aliveRef.current && setSpinIndex(idx), () => aliveRef.current);
      if (!aliveRef.current) return;
    } else if (option.outcomes.length > 1) {
      const targetIndex = Math.max(0, option.outcomes.findIndex((o) => o.id === resolved.outcomeId));
      await spinToIndex(option.outcomes.length, targetIndex, (idx) => aliveRef.current && setSpinIndex(idx), () => aliveRef.current);
      if (!aliveRef.current) return;
    }

    setResult(resolved);
    setPhase("revealed");
    await sleep(3200);
    reload();
  }

  const errorBanner = error && (
    <p className="mb-3 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">⚠️ {error}</p>
  );

  if (display.type === "offer") {
    return (
      <>
      {errorBanner}
      <DecisionShell
        banner={<div className="h-full w-full bg-gradient-to-br from-[#0f2f1c] via-[#134025] to-accent-strong" />}
        badge={
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
            📋 Decisión de club
          </span>
        }
        age={display.age}
        title={display.title}
        description={display.description}
        hint="Un clic define tu elección y arranca la próxima temporada."
      >
        {display.options.map((option) => {
          const isActive = activeKey === option.optionKey;
          return (
            <button
              key={option.optionKey}
              type="button"
              disabled={busy}
              onClick={() => handleChooseOffer(option)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 border-border bg-surface-alt p-4 text-left transition ${
                busy && !isActive ? "opacity-40" : ""
              } ${!busy ? "hover:scale-[1.01] hover:border-accent hover:bg-accent/10" : ""} ${
                isActive ? "border-accent" : ""
              }`}
            >
              {option.clubColor && option.clubShort && (
                <ClubCrest color={option.clubColor} label={option.clubShort} src={crestSrc(option.clubKey)} size={40} />
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate text-base font-bold">
                  {option.label}
                  {option.countryCode && <Flag code={option.countryCode} />}
                </p>
                {option.description && <p className="truncate text-xs text-muted">{option.description}</p>}
                {option.reputation && (
                  <p className="mt-0.5 text-xs tracking-wide text-gold">
                    {STARS.slice(0, option.reputation)}
                    <span className="text-border">{STARS.slice(option.reputation)}</span>
                  </p>
                )}
                {isActive && (
                  <p className="mt-1 text-xs text-accent">
                    <span className="spin-die inline-block">🎲</span> Confirmando fichaje…
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </DecisionShell>
      </>
    );
  }

  if (display.type === "event") {
    const category = display.category;
    const isShootout = SHOOTOUT_EVENT_KEYS.has(display.eventKey);
    return (
      <>
      {errorBanner}
      <DecisionShell
        banner={<EventIllustration category={category} />}
        badge={
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
            {CATEGORY_ICONS[category]} {EVENT_CATEGORY_LABELS[category]}
          </span>
        }
        age={display.age}
        title={display.title}
        description={display.description}
        hint={phase === "revealed" ? "Mirá cómo salió y seguí cuando quieras." : "Un clic resuelve la decisión."}
      >
        {display.options.map((option) => {
          const isActive = activeKey === option.key;
          const revealedHere = isActive && phase === "revealed";
          return (
            <div
              key={option.key}
              className={`flex h-full w-full flex-col rounded-xl border-2 p-4 text-left transition ${
                revealedHere ? "border-accent" : "border-border"
              } ${busy && !isActive ? "opacity-40" : "bg-surface-alt"}`}
            >
              <button
                type="button"
                disabled={busy}
                onClick={() => handleChooseEvent(option)}
                className={`flex flex-col text-left ${!busy ? "cursor-pointer hover:opacity-90" : "cursor-default"}`}
              >
                <p className="text-base font-bold">{option.label}</p>
                <p className="mt-0.5 text-xs text-muted">{option.description}</p>
              </button>
              {isShootout && option.outcomes.length > 1 ? (
                isActive && phase !== "busy" ? (
                  <div className="mt-3">
                    <PenaltyShootout
                      zone={spinIndex}
                      phase={phase === "revealed" ? "revealed" : "spinning"}
                      outcomeKind={result ? SHOOTOUT_OUTCOME_KIND[result.outcomeId] : undefined}
                      label={phase === "revealed" ? "" : "Cobrando el penal…"}
                    />
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-muted">🥅 Se define pateando al arco.</p>
                )
              ) : (
                <>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {option.outcomes.map((outcome, idx) => (
                      <OutcomeChip
                        key={outcome.id}
                        outcome={outcome}
                        highlighted={isActive && ((phase === "spinning" && idx === spinIndex) || (phase === "revealed" && outcome.id === result?.outcomeId))}
                        dimmed={isActive && phase === "revealed" && outcome.id !== result?.outcomeId}
                      />
                    ))}
                  </div>
                  {isActive && phase === "spinning" && (
                    <p className="mt-3 text-xs font-semibold text-accent">
                      <span className="spin-die inline-block">🎲</span> Definiendo la suerte…
                    </p>
                  )}
                </>
              )}
              {revealedHere && result && (
                <>
                  <p className="pop-in mt-3 rounded-lg bg-background/60 p-2 text-xs italic text-foreground/90">
                    {result.summary}
                  </p>
                  <button
                    type="button"
                    onClick={reload}
                    className="mt-3 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent-strong"
                  >
                    Continuar ▶️
                  </button>
                </>
              )}
            </div>
          );
        })}
      </DecisionShell>
      </>
    );
  }

  return (
    <>
    {errorBanner}
    <div className="rounded-2xl border border-border bg-surface p-6 text-center">
      <p className="text-sm text-muted">🎮 No tenés decisiones pendientes.</p>
      <button
        type="button"
        disabled={busy}
        onClick={handleAdvance}
        className="mt-4 w-full rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-accent-strong disabled:opacity-60 sm:w-auto"
      >
        {busy ? (
          <>
            <span className="spin-die inline-block">🎲</span> Simulando temporada…
          </>
        ) : (
          "▶️ Avanzar temporada"
        )}
      </button>
    </div>
    </>
  );
}
