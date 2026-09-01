import { ClubCrest } from "@/components/ClubCrest";
import { crestSrc } from "@/lib/game/data/crestFiles";
import { CareerDetail } from "@/lib/game/queries";

const LEAGUE_RESULT_LABELS: Record<string, string> = {
  CAMPEON: "🏆 Campeón",
  SUBCAMPEON: "🥈 Subcampeón",
  TOP4: "Top 4",
  MEDIA_TABLA: "Media tabla",
  DESCENSO: "Descenso",
};

const CUP_RESULT_LABELS: Record<string, string> = {
  CAMPEON: "🎖️ Campeón",
  FINAL: "Final",
  SEMIS: "Semifinal",
  CUARTOS: "Cuartos",
  ELIMINADO_TEMPRANO: "Eliminado",
};

export function SeasonTable({ career }: { career: CareerDetail }) {
  const seasons = [...career.seasons].reverse();

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="font-bold">Temporada a temporada</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase text-muted">
              <th className="py-2 pr-3">Edad</th>
              <th className="py-2 pr-3">Club</th>
              <th className="py-2 pr-3">OVR</th>
              <th className="py-2 pr-3">PJ</th>
              <th className="py-2 pr-3">G</th>
              <th className="py-2 pr-3">A</th>
              <th className="py-2 pr-3">Rating</th>
              <th className="py-2 pr-3">Liga</th>
              <th className="py-2 pr-3">Copa</th>
              <th className="py-2 pr-3">Selección</th>
            </tr>
          </thead>
          <tbody>
            {seasons.length === 0 && (
              <tr>
                <td colSpan={10} className="py-6 text-center text-muted">
                  Todavía no jugaste ninguna temporada.
                </td>
              </tr>
            )}
            {seasons.map((season) => {
              const rowClass =
                season.leagueResult === "CAMPEON" || season.cupResult === "CAMPEON"
                  ? "bg-gold/10"
                  : season.leagueResult === "DESCENSO"
                    ? "bg-danger/10"
                    : season.leagueResult === "SUBCAMPEON"
                      ? "bg-silver/10"
                      : "";
              return (
                <tr key={season.id} className={`border-b border-border/60 ${rowClass}`}>
                  <td className="py-2 pr-3">{season.age}</td>
                  <td className="py-2 pr-3">
                    <span className="flex items-center gap-2">
                      {season.club && (
                        <ClubCrest
                          color={season.club.primaryColor}
                          label={season.club.shortName}
                          src={crestSrc(season.club.key)}
                          size={26}
                        />
                      )}
                      {season.club?.name ?? "-"}
                      {season.onLoan ? " (préstamo)" : ""}
                    </span>
                  </td>
                  <td className="py-2 pr-3">{season.overall}</td>
                  <td className="py-2 pr-3">{season.matches}</td>
                  <td className="py-2 pr-3">⚽ {season.goals}</td>
                  <td className="py-2 pr-3">🎯 {season.assists}</td>
                  <td className="py-2 pr-3">{season.avgRating.toFixed(2)}</td>
                  <td className="py-2 pr-3 text-xs">
                    {season.leagueResult ? LEAGUE_RESULT_LABELS[season.leagueResult] : "-"}
                  </td>
                  <td className="py-2 pr-3 text-xs">
                    {season.cupResult ? CUP_RESULT_LABELS[season.cupResult] : "-"}
                  </td>
                  <td className="py-2 pr-3 text-xs">
                    {season.ntCallUp ? `🎽 ${season.ntCaps} PJ / ${season.ntGoals}G` : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {career.events.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-muted">Últimas decisiones</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {career.events.map((event) => (
              <li key={event.id} className="rounded-lg bg-surface-alt p-3 text-sm">
                <p className="font-medium">
                  {event.age} años · {event.eventTitle}
                </p>
                <p className="text-xs text-muted">
                  {event.optionLabel} → {event.outcomeSummary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
