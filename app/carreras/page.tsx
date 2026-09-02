import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteCareerAction } from "@/app/actions/career";
import { ClubCrest } from "@/components/ClubCrest";
import { Flag } from "@/components/Flag";
import { crestSrc } from "@/lib/game/data/crestFiles";
import { getCurrentUser } from "@/lib/auth";
import { formatCurrency } from "@/lib/game/format";
import { prisma } from "@/lib/prisma";
import { POSITION_LABELS, Position } from "@/lib/game/types";

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

export default async function CarrerasPage() {
  const user = await getCurrentUser();
  // The layout already redirects unauthenticated visitors, but it calls getCurrentUser()
  // independently — this page can't assume that check already ran, so it needs its own guard
  // instead of a `!` assertion that would crash the whole render. /session-invalid (not /login
  // directly) actually clears a stale cookie instead of looping with proxy.ts forever.
  if (!user) redirect("/session-invalid");

  const careers = await prisma.playerCareer.findMany({
    where: { userId: user.id },
    include: { currentClub: true, nationality: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tus carreras</h1>
        <Link
          href="/carreras/nuevo"
          className="rounded-full bg-accent px-5 py-2.5 font-semibold text-black transition hover:bg-accent-strong"
        >
          Nueva carrera
        </Link>
      </div>

      {careers.length === 0 ? (
        <p className="mt-10 text-muted">
          Todavía no creaste ninguna carrera. Arrancá la primera con el botón de arriba.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {careers.map((career) => (
            <div
              key={career.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition hover:border-accent/50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-xl font-bold text-accent">
                {career.overall}
              </div>
              {career.currentClub ? (
                <ClubCrest
                  color={career.currentClub.primaryColor}
                  label={career.currentClub.shortName}
                  src={crestSrc(career.currentClub.key)}
                  size={40}
                  className="shrink-0"
                />
              ) : (
                <div className="h-10 w-10 shrink-0 rounded-lg border border-dashed border-border" />
              )}
              <div className="min-w-0 flex-1">
                <Link href={`/carreras/${career.id}`} className="inline-flex items-center gap-1.5 font-semibold hover:underline">
                  <Flag code={career.nationality.code} title={career.nationality.name} />
                  {career.lastName} #{career.jerseyNumber}
                </Link>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
                  <span>
                    {POSITION_ICONS[career.position as Position]} {POSITION_LABELS[career.position as Position]}
                  </span>
                  <span>·</span>
                  <span>{career.currentClub?.name ?? "Sin club"}</span>
                  <span>· 🎂 {career.age} años · 💰 {formatCurrency(career.marketValueEUR)}</span>
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  career.status === "ACTIVE"
                    ? "bg-accent/20 text-accent"
                    : "bg-surface-alt text-muted"
                }`}
              >
                {career.status === "ACTIVE" ? "🟢 Activa" : "⚪ Retirado"}
              </span>
              <form action={deleteCareerAction.bind(null, career.id)}>
                <button type="submit" className="text-sm text-muted hover:text-danger">
                  Eliminar
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
