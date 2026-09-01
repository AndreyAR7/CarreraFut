export type ShootoutOutcomeKind = "GOAL" | "SAVED" | "MISSED";

// 3 aim zones across the goal mouth — kept purely horizontal (no high/low) so the whole thing
// reads clearly at a glance instead of trying to be a full 2D penalty sim.
const ZONE_X = [70, 150, 230] as const;
const GOAL_LEFT = 45;
const GOAL_RIGHT = 255;

function ballTarget(zone: number, outcomeKind: ShootoutOutcomeKind | undefined) {
  const x = ZONE_X[zone] ?? ZONE_X[1];
  if (!outcomeKind) return { x: 150, y: 172, scale: 1 };
  if (outcomeKind === "GOAL") return { x, y: 48, scale: 0.62 };
  if (outcomeKind === "SAVED") return { x, y: 104, scale: 0.8 };
  // MISSED: the shot keeps traveling past the frame — wide past a post, or over the bar if it
  // was aimed centrally.
  if (zone === 1) return { x: 150, y: -6, scale: 0.55 };
  return { x: zone === 0 ? GOAL_LEFT - 22 : GOAL_RIGHT + 22, y: 60, scale: 0.6 };
}

function keeperZoneFor(zone: number, outcomeKind: ShootoutOutcomeKind | undefined): number {
  if (outcomeKind === "SAVED") return zone;
  // Dive to a different zone than the shot so a goal/miss visually reads as "wrong-footed".
  return (zone + 1) % 3;
}

export function PenaltyShootout({
  zone,
  phase,
  outcomeKind,
  label,
}: {
  zone: number;
  phase: "spinning" | "revealed";
  outcomeKind?: ShootoutOutcomeKind;
  label: string;
}) {
  const kicked = phase === "revealed" && Boolean(outcomeKind);
  const ball = ballTarget(zone, kicked ? outcomeKind : undefined);
  const keeperZone = keeperZoneFor(zone, outcomeKind);
  const keeperX = kicked ? (ZONE_X[keeperZone] ?? ZONE_X[1]) : 150;

  return (
    <div className="rounded-xl border-2 border-border bg-gradient-to-b from-[#0c1b12] to-[#123320] p-3">
      <svg viewBox="0 0 300 200" className="h-44 w-full">
        <defs>
          <pattern id="net-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 0H10M0 0V10" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          </pattern>
        </defs>

        {/* Pitch */}
        <rect x="0" y="150" width="300" height="50" fill="rgba(255,255,255,0.05)" />
        <rect x="0" y="150" width="300" height="1.5" fill="rgba(255,255,255,0.3)" />

        {/* Net + frame */}
        <rect x={GOAL_LEFT} y="20" width={GOAL_RIGHT - GOAL_LEFT} height="90" fill="url(#net-pattern)" />
        <g stroke="#e5e7eb" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d={`M${GOAL_LEFT} 110V20H${GOAL_RIGHT}V110`} />
        </g>

        {/* Aim zone markers */}
        {ZONE_X.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={95}
            r={phase === "spinning" && i === zone ? 10 : 6}
            fill={phase === "spinning" && i === zone ? "rgba(250,204,21,0.85)" : "rgba(255,255,255,0.18)"}
            className="transition-all duration-150"
          />
        ))}

        {/* Goalkeeper */}
        <g
          style={{ transform: `translateX(${keeperX - 150}px)`, transition: "transform 0.55s ease-out" }}
        >
          <rect x="138" y="88" width="24" height="30" rx="6" fill="#1d4ed8" />
          <circle cx="150" cy="82" r="8" fill="#fcd9b8" />
        </g>

        {/* Ball */}
        <circle
          cx={150}
          cy={172}
          r="9"
          fill="#f9fafb"
          stroke="#111827"
          strokeWidth="1.2"
          style={{
            transform: `translate(${ball.x - 150}px, ${ball.y - 172}px) scale(${ball.scale})`,
            transition: kicked ? "transform 0.55s cubic-bezier(0.3,0.8,0.4,1)" : "transform 0.2s ease-out",
          }}
        />
      </svg>

      <p className="mt-1 text-center text-xs font-semibold text-white/80">{label}</p>

      {kicked && (
        <p
          className={`pop-in mt-1 text-center text-lg font-extrabold tracking-wide ${
            outcomeKind === "GOAL" ? "text-accent" : "text-danger"
          }`}
        >
          {outcomeKind === "GOAL" ? "¡GOL!" : outcomeKind === "SAVED" ? "¡ATAJADA!" : "¡AFUERA!"}
        </p>
      )}
    </div>
  );
}
