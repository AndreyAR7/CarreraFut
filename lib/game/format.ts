import { EventEffects, STAT_LABELS } from "./types";

export function describeEffects(effects: EventEffects): string {
  const parts: string[] = [];

  if (effects.statDeltas) {
    for (const [key, value] of Object.entries(effects.statDeltas)) {
      if (value) {
        const label = STAT_LABELS[key as keyof typeof STAT_LABELS];
        parts.push(`${value > 0 ? "+" : ""}${value} ${label}`);
      }
    }
  }
  if (effects.moraleDelta) {
    parts.push(`${effects.moraleDelta > 0 ? "+" : ""}${effects.moraleDelta} moral`);
  }
  if (effects.fitnessDelta) {
    parts.push(`${effects.fitnessDelta > 0 ? "+" : ""}${effects.fitnessDelta} físico`);
  }
  if (effects.marketValueMultiplier && effects.marketValueMultiplier !== 1) {
    const pct = Math.round((effects.marketValueMultiplier - 1) * 100);
    parts.push(`${pct > 0 ? "+" : ""}${pct}% valor de mercado`);
  }
  if (effects.suspensionMatches) {
    parts.push(`Suspensión (${effects.suspensionMatches} partidos)`);
  }
  if (effects.injuryWeeks) {
    parts.push(`Lesión (${effects.injuryWeeks} semanas)`);
  }
  if (effects.reputationDelta) {
    parts.push(`${effects.reputationDelta > 0 ? "+" : ""}${effects.reputationDelta} fama`);
  }
  if (effects.starterShareDelta) {
    parts.push(
      `${effects.starterShareDelta > 0 ? "+" : ""}${Math.round(effects.starterShareDelta * 100)}% titularidad`,
    );
  }
  if (effects.awardsWorldCup) {
    parts.push("🏆 Título del Mundial");
  }
  if (effects.awardsContinentalTitle) {
    parts.push("🏆 Título continental");
  }
  if (effects.promotesToBetterClub) {
    parts.push("📈 Pasás a un club mejor");
  }
  if (effects.scandalFollowupKey) {
    parts.push("⚠️ Puede tener consecuencias más adelante");
  }
  if (effects.forcesDemotionScandal) {
    parts.push("📉 Salida forzada del club");
  }

  return parts.length > 0 ? parts.join(" · ") : "Sin cambios";
}

export type EffectTone = "positive" | "negative" | "neutral";

// Weighted sum of every delta an outcome carries, so the UI can color-code it (green/red/gray)
// without re-deriving meaning from the human-readable summary string.
export function effectTone(effects: EventEffects): EffectTone {
  let score = 0;

  if (effects.statDeltas) {
    for (const value of Object.values(effects.statDeltas)) {
      if (value) score += value;
    }
  }
  if (effects.moraleDelta) score += effects.moraleDelta;
  if (effects.fitnessDelta) score += effects.fitnessDelta * 0.5;
  if (effects.marketValueMultiplier && effects.marketValueMultiplier !== 1) {
    score += (effects.marketValueMultiplier - 1) * 100;
  }
  if (effects.suspensionMatches) score -= effects.suspensionMatches * 3;
  if (effects.injuryWeeks) score -= effects.injuryWeeks * 2;
  if (effects.reputationDelta) score += effects.reputationDelta;
  if (effects.starterShareDelta) score += effects.starterShareDelta * 100 * 0.5;
  if (effects.awardsWorldCup) score += 20;
  if (effects.awardsContinentalTitle) score += 18;
  if (effects.promotesToBetterClub) score += 12;
  if (effects.scandalFollowupKey) score -= 5;
  if (effects.forcesDemotionScandal) score -= 30;

  if (score > 1) return "positive";
  if (score < -1) return "negative";
  return "neutral";
}

export function formatCurrency(amountEUR: number): string {
  if (amountEUR >= 1_000_000) {
    return `€${(amountEUR / 1_000_000).toFixed(amountEUR % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (amountEUR >= 1_000) {
    return `€${Math.round(amountEUR / 1000)}K`;
  }
  return `€${amountEUR}`;
}
