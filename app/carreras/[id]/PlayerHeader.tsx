import { ClubCrest } from "@/components/ClubCrest";
import { Flag } from "@/components/Flag";
import { TrophyIcon } from "@/components/TrophyIcon";
import { INDIVIDUAL_AWARDS } from "@/lib/game/data/awards";
import { crestSrc } from "@/lib/game/data/crestFiles";
import { formatCurrency } from "@/lib/game/format";
import { CareerDetail } from "@/lib/game/queries";
import { POSITION_LABELS, Position, TROPHY_LABELS, TrophyTier } from "@/lib/game/types";

// Individual awards all share the INDIVIDUAL tier but are visually and thematically distinct
// (a ball trophy, a boot, a shooting star) — group them by award name instead of lumping every
// one into a single generic "star" chip.
function individualAwardName(name: string): string | null {
  if (name.startsWith(INDIVIDUAL_AWARDS.BALLON_DOR)) return INDIVIDUAL_AWARDS.BALLON_DOR;
  if (name.startsWith(INDIVIDUAL_AWARDS.GOLDEN_BOOT)) return INDIVIDUAL_AWARDS.GOLDEN_BOOT;
  if (name.startsWith(INDIVIDUAL_AWARDS.PUSKAS)) return INDIVIDUAL_AWARDS.PUSKAS;
  return null;
}

const POSITION_ICONS: Record<Position, string> = {
  POR: "🧤",
  DFC: "🛡️",
  LI: "🛡️",
  LD: "🛡️",
  MCD: "🦵",
  MC: "🎯",
  MI: "🎯",
  MD: "🎯",
  MCO: "🎨",
  EI: "💨",
  ED: "💨",
  DC: "⚽",
};

function overallTier(overall: number): { color: string; glow: string } {
  if (overall >= 85) return { color: "var(--gold)", glow: "shadow-[0_0_16px_rgba(251,191,36,0.55)]" };
  if (overall >= 75) return { color: "var(--accent)", glow: "shadow-[0_0_14px_rgba(34,197,94,0.45)]" };
  if (overall >= 60) return { color: "var(--blue)", glow: "shadow-[0_0_12px_rgba(59,130,246,0.4)]" };
  return { color: "var(--silver)", glow: "" };
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

const Divider = () => <div className="hidden h-12 w-px shrink-0 bg-border sm:block" />;

export function PlayerHeader({ career }: { career: CareerDetail }) {
  const tier = overallTier(career.overall);
  const totalMatches = career.seasons.reduce((sum, s) => sum + s.matches, 0);
  const totalGoals = career.seasons.reduce((sum, s) => sum + s.goals, 0);
  const totalAssists = career.seasons.reduce((sum, s) => sum + s.assists, 0);

  const trophyGroups = career.trophies.reduce<Record<string, { tier: string; name?: string; count: number }>>(
    (acc, t) => {
      const awardName = individualAwardName(t.name);
      const key = awardName ?? t.tier;
      const entry = acc[key] ?? { tier: t.tier, name: awardName ?? undefined, count: 0 };
      entry.count += 1;
      acc[key] = entry;
      return acc;
    },
    {},
  );
  const totalTrophies = career.trophies.length;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl font-extrabold text-black ${tier.glow}`}
            style={{ backgroundColor: tier.color }}
          >
            {career.overall}
          </div>
          <div>
            <p className="flex items-center gap-2 text-xl font-bold">
              <Flag code={career.nationality.code} size="1.5em" title={career.nationality.name} />
              {career.lastName} <span className="text-muted">#{career.jerseyNumber}</span>
            </p>
            <p className="text-sm text-muted">
              {POSITION_ICONS[career.position as Position]} {POSITION_LABELS[career.position as Position]}
            </p>
          </div>
        </div>

        <Divider />

        <div className="flex items-center gap-3">
          {career.currentClub ? (
            <ClubCrest
              color={career.currentClub.primaryColor}
              label={career.currentClub.shortName}
              src={crestSrc(career.currentClub.key)}
              size={40}
            />
          ) : (
            <div className="h-10 w-10 shrink-0 rounded-lg border border-dashed border-border" />
          )}
          <div>
            <p className="font-semibold">
              {career.currentClub?.name ?? "Sin club"}
              {career.onLoanFromId ? " (préstamo)" : ""}
            </p>
            <p className="text-xs text-muted">
              🎂 {career.age} años · 💰 {formatCurrency(career.marketValueEUR)}
            </p>
          </div>
        </div>

        <Divider />

        <div className="flex items-center gap-5">
          <Stat label="PJ" value={totalMatches} />
          <Stat label="⚽ Goles" value={totalGoals} />
          <Stat label="🎯 Asist." value={totalAssists} />
        </div>

        <Divider />

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
            🏆 Palmarés {totalTrophies > 0 && <span className="text-gold">({totalTrophies})</span>}
          </p>
          {totalTrophies > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(trophyGroups).map(([key, group]) => (
                <span
                  key={key}
                  title={group.name ?? TROPHY_LABELS[group.tier as TrophyTier]}
                  className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-sm font-bold text-gold"
                >
                  <TrophyIcon tier={group.tier as TrophyTier} name={group.name} size={18} /> {group.count}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-sm text-muted">Todavía sin títulos</span>
          )}
        </div>
      </div>
    </div>
  );
}
