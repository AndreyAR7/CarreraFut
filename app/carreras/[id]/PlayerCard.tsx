import { Flag } from "@/components/Flag";
import { CareerDetail } from "@/lib/game/queries";
import { STAT_KEYS, STAT_LABELS, StatKey } from "@/lib/game/types";

const STAT_ICONS: Record<StatKey, string> = {
  pace: "⚡",
  shooting: "🎯",
  passing: "🎨",
  defense: "🛡️",
  physical: "💪",
  mentality: "🧠",
};

function StatBar({ label, value, color, icon }: { label: string; value: number; color: string; icon?: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted">
        <span>{icon ? `${icon} ${label}` : label}</span>
        <span className="font-semibold text-foreground">{Math.round(value)}</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function PlayerCard({ career }: { career: CareerDetail }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Atributos</h2>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3">
        {STAT_KEYS.map((key) => (
          <div key={key} className="rounded-lg bg-surface-alt px-1 py-2 text-center">
            <p className="text-lg leading-none">{STAT_ICONS[key]}</p>
            <p className="mt-1 text-sm font-bold">{Math.round(career[key])}</p>
            <p className="text-[10px] text-muted">{STAT_LABELS[key]}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <StatBar label="Moral" value={career.morale} color="var(--accent)" icon="😊" />
        <StatBar label="Físico" value={career.fitness} color="var(--blue)" icon="🔋" />
        <StatBar label="Titularidad" value={career.starterShare * 100} color="var(--warning)" icon="⏱️" />
      </div>

      <div className="mt-5 rounded-lg bg-surface-alt px-3 py-2 text-sm">
        <p className="flex items-center gap-2 font-medium">
          <Flag code={career.nationality.code} size="1.3em" title={career.nationality.name} />
          {career.nationality.name}
        </p>
        <p className="text-muted">
          🎽 {career.ntCaps} partidos · ⚽ {career.ntGoals} goles · 🎯 {career.ntAssists} asist.
        </p>
      </div>
    </div>
  );
}
