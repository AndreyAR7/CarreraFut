import Link from "next/link";
import { ClubCrest } from "@/components/ClubCrest";
import { Flag } from "@/components/Flag";
import { TrophyIcon } from "@/components/TrophyIcon";
import { crestSrc } from "@/lib/game/data/crestFiles";
import { formatCurrency } from "@/lib/game/format";
import { CareerDetail } from "@/lib/game/queries";
import { POSITION_LABELS, Position, TrophyTier } from "@/lib/game/types";

export function RetiredSummary({ career }: { career: CareerDetail }) {
  const totalMatches = career.seasons.reduce((sum, s) => sum + s.matches, 0);
  const totalGoals = career.seasons.reduce((sum, s) => sum + s.goals, 0);
  const totalAssists = career.seasons.reduce((sum, s) => sum + s.assists, 0);

  const clubStats = new Map<
    string,
    {
      name: string;
      color: string;
      shortName: string;
      clubKey: string;
      matches: number;
      goals: number;
      assists: number;
      trophies: { tier: string; name: string }[];
    }
  >();
  for (const season of career.seasons) {
    if (!season.clubId || !season.club) continue;
    const entry = clubStats.get(season.clubId) ?? {
      name: season.club.name,
      color: season.club.primaryColor,
      shortName: season.club.shortName,
      clubKey: season.club.key,
      matches: 0,
      goals: 0,
      assists: 0,
      trophies: [],
    };
    entry.matches += season.matches;
    entry.goals += season.goals;
    entry.assists += season.assists;
    clubStats.set(season.clubId, entry);
  }
  for (const trophy of career.trophies) {
    if (trophy.clubId && clubStats.has(trophy.clubId)) {
      clubStats.get(trophy.clubId)!.trophies.push({ tier: trophy.tier, name: trophy.name });
    }
  }

  const nationalTrophies = career.trophies.filter((t) => t.isNationalTeam);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          🏁 Carrera finalizada
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {career.lastName} <span className="text-muted">#{career.jerseyNumber}</span>
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <Flag code={career.nationality.code} title={career.nationality.name} />{" "}
              {POSITION_LABELS[career.position as Position]} · {formatCurrency(career.marketValueEUR)}
            </p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent text-2xl font-bold text-black">
            {career.overall}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center sm:grid-cols-3">
          <div>
            <p className="text-xl font-bold">{totalMatches}</p>
            <p className="text-xs text-muted">Partidos</p>
          </div>
          <div>
            <p className="text-xl font-bold">{totalGoals}</p>
            <p className="text-xs text-muted">Goles</p>
          </div>
          <div>
            <p className="text-xl font-bold">{totalAssists}</p>
            <p className="text-xs text-muted">Asistencias</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-surface-alt p-4">
          <p className="flex items-center gap-1.5 font-semibold">
            <Flag code={career.nationality.code} /> {career.nationality.name}
          </p>
          <p className="text-sm text-muted">
            🎽 {career.ntCaps} partidos · ⚽ {career.ntGoals} goles · 🎯 {career.ntAssists} asistencias
          </p>
          {nationalTrophies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {nationalTrophies.map((t) => (
                <span
                  key={t.id}
                  className="flex items-center gap-1 rounded-full bg-background px-2 py-0.5 text-xs"
                >
                  <TrophyIcon tier={t.tier as TrophyTier} name={t.name} size={14} /> {t.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[...clubStats.entries()].map(([clubId, stats]) => (
            <div key={clubId} className="rounded-xl bg-surface-alt p-4">
              <p className="flex items-center gap-2 font-semibold">
                <ClubCrest color={stats.color} label={stats.shortName} src={crestSrc(stats.clubKey)} size={36} />
                {stats.name}
              </p>
              <p className="text-sm text-muted">
                {stats.matches} PJ · ⚽ {stats.goals} G · 🎯 {stats.assists} A
              </p>
              {stats.trophies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 text-xs">
                  {stats.trophies.map((t, i) => (
                    <span key={i} title={t.name}>
                      <TrophyIcon tier={t.tier as TrophyTier} name={t.name} size={16} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/carreras/nuevo"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:bg-accent-strong"
          >
            Volver a jugar
          </Link>
          <Link
            href="/carreras"
            className="rounded-full border border-border px-6 py-3 font-semibold transition hover:bg-surface-alt"
          >
            Ver todas mis carreras
          </Link>
        </div>
      </div>
    </div>
  );
}
