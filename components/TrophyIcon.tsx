import { useId } from "react";
import { TrophyTier } from "@/lib/game/types";
import { INDIVIDUAL_AWARDS } from "@/lib/game/data/awards";

// Real trophies (the actual Champions League cup, the World Cup, the Ballon d'Or gala statue,
// etc.) are trademarked objects — actual product designs their owners license and litigate
// over, more tightly than a club crest — so instead of tracing them, each one gets its own
// DISTINCT drawn silhouette (with a glossy gradient so it reads as an object, not a flat icon)
// that evokes the family of trophy it represents without copying anyone's exact design:
//   LEAGUE       -> a classic single-handle cup
//   DOMESTIC_CUP -> a squat two-handle cup with a ribbon
//   CONTINENTAL  -> a tall cup with big round "ears" (nods at the Champions-League silhouette)
//   WORLD        -> a globe resting on a cup (nods at the World Cup's globe motif)
//   Ballón de Oro -> a soccer ball on a pedestal, star on top
//   Bota de Oro   -> a gold boot
//   Puskás        -> a shooting-star trophy
//   (any other individual award) -> a medal/star
const TIER_COLOR: Record<TrophyTier, string> = {
  LEAGUE: "#fbbf24",
  DOMESTIC_CUP: "#cbd5e1",
  CONTINENTAL: "#60a5fa",
  WORLD: "#fbbf24",
  INDIVIDUAL: "#c084fc",
};

const GRADIENT_STOPS: Record<string, [string, string, string]> = {
  "#fbbf24": ["#fff3c4", "#fbbf24", "#b45309"],
  "#cbd5e1": ["#ffffff", "#cbd5e1", "#64748b"],
  "#60a5fa": ["#dbeafe", "#60a5fa", "#1d4ed8"],
  "#c084fc": ["#f3e8ff", "#c084fc", "#7e22ce"],
};

function Shine({ id, color }: { id: string; color: string }) {
  const stops = GRADIENT_STOPS[color] ?? GRADIENT_STOPS["#fbbf24"];
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={stops[0]} />
      <stop offset="55%" stopColor={stops[1]} />
      <stop offset="100%" stopColor={stops[2]} />
    </linearGradient>
  );
}

function LeagueCup({ fill }: { fill: string }) {
  return (
    <>
      <path d="M8 3.5h8v4.2c0 2.9-1.79 5.1-4 5.1s-4-2.2-4-5.1V3.5Z" fill={fill} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <path d="M8 4.3H5.6A2.6 2.6 0 0 0 8 6.9" fill="none" stroke={fill} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M16 4.3h2.4a2.6 2.6 0 0 1-2.6 2.6" fill="none" stroke={fill} strokeWidth="1.3" strokeLinecap="round" />
      <rect x="11" y="12.6" width="2" height="2.8" fill={fill} />
      <rect x="7.5" y="15.3" width="9" height="1.6" rx="0.8" fill={fill} />
      <path d="M8.6 17.9h6.8l0.8 2.2H7.8l0.8-2.2Z" fill={fill} />
    </>
  );
}

function DomesticCup({ fill }: { fill: string }) {
  return (
    <>
      <path d="M7.5 4h9v3.6c0 3.1-1.98 5.6-4.5 5.6S7.5 10.7 7.5 7.6V4Z" fill={fill} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <path d="M7.5 5H4.8a3 3 0 0 0 3.2 3" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.5 5h2.7a3 3 0 0 1-3.2 3" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 8.5c1 1.4 4 1.4 5 0" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" fill="none" />
      <rect x="11" y="13.2" width="2" height="2.6" fill={fill} />
      <rect x="7" y="15.8" width="10" height="1.7" rx="0.85" fill={fill} />
      <path d="M8.2 17.5h7.6l0.9 2.5H7.3l0.9-2.5Z" fill={fill} />
    </>
  );
}

function ContinentalCup({ fill }: { fill: string }) {
  return (
    <>
      <path d="M8.2 2.8h7.6v5c0 2.9-1.7 5-3.8 5s-3.8-2.1-3.8-5v-5Z" fill={fill} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="5.4" cy="6.2" r="2.4" fill="none" stroke={fill} strokeWidth="1.5" />
      <circle cx="18.6" cy="6.2" r="2.4" fill="none" stroke={fill} strokeWidth="1.5" />
      <path d="M7.6 5.6c-0.6 0.4-1.2 0.5-1.9 0.4" fill="none" stroke={fill} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16.4 5.6c0.6 0.4 1.2 0.5 1.9 0.4" fill="none" stroke={fill} strokeWidth="1.2" strokeLinecap="round" />
      <rect x="11" y="12.8" width="2" height="2.8" fill={fill} />
      <rect x="7.3" y="15.5" width="9.4" height="1.6" rx="0.8" fill={fill} />
      <path d="M8.4 17.1h7.2l0.85 2.3H7.55l0.85-2.3Z" fill={fill} />
    </>
  );
}

function WorldTrophy({ fill }: { fill: string }) {
  return (
    <>
      <circle cx="12" cy="6.6" r="4.4" fill={fill} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <path d="M7.7 6.6h8.6M12 2.2v8.8" stroke="rgba(0,0,0,0.28)" strokeWidth="0.55" />
      <path
        d="M9 4.6c1.6 1 4.4 1 6 0M8.2 8.8c2.3 1.3 5.3 1.3 7.6 0"
        fill="none"
        stroke="rgba(0,0,0,0.28)"
        strokeWidth="0.55"
      />
      <rect x="11" y="11.3" width="2" height="2.9" fill={fill} />
      <rect x="7.3" y="14.1" width="9.4" height="1.7" rx="0.85" fill={fill} />
      <path d="M8.4 15.8h7.2l0.9 2.6H7.5l0.9-2.6Z" fill={fill} />
    </>
  );
}

function BallonDorTrophy({ fill }: { fill: string }) {
  return (
    <>
      <circle cx="12" cy="7" r="5" fill={fill} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <path
        d="M12 3.6l1.4 1-.5 1.6h-1.8l-.5-1.6ZM9 6l1.1 1.5-.6 1.8H8l-1.1-1.6Zm6 0l1.1-.3L17 7.4l-1.1 1.6h-1.5l-.6-1.8Zm-6 5 1.7-.4 1.3 1v1.7l-1.5.9-1.9-1.1Zm6 0-.6 2.2-1.9 1.1-1.5-.9v-1.7l1.3-1Z"
        fill="rgba(0,0,0,0.22)"
      />
      <path d="M12 1.6l0.8 1.7 1.9 0.2-1.4 1.3 0.35 1.9L12 5.8l-1.65 0.9 0.35-1.9-1.4-1.3 1.9-0.2Z" fill="#fff" opacity="0.85" />
      <rect x="11" y="12" width="2" height="3" fill={fill} />
      <path d="M8.3 16.6c1-1 5.4-1 7.4 0l0.6 2.1H7.7Z" fill={fill} />
    </>
  );
}

function GoldenBoot({ fill }: { fill: string }) {
  return (
    <>
      <path
        d="M6.5 14.5V7.2c0-.9.7-1.6 1.6-1.6h2.3c.5 0 1 .25 1.3.65l2.7 3.55c.6.3 1.9.9 3.3 1.1.9.1 1.6.85 1.6 1.75V16c0 .9-.7 1.6-1.6 1.6H8.1c-.9 0-1.6-.7-1.6-1.6Z"
        fill={fill}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.5"
      />
      <path d="M6.5 9.3h5.9" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
      <path d="M8 5.9v3" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
      <rect x="6.2" y="16.2" width="12.6" height="1.6" rx="0.8" fill={fill} />
      <path d="M12.5 4.2l0.6 1.3 1.4 0.15-1 .95 0.25 1.4-1.25-.65-1.25.65.25-1.4-1-.95 1.4-.15Z" fill="#fff" opacity="0.8" />
    </>
  );
}

function PuskasTrophy({ fill }: { fill: string }) {
  return (
    <>
      <path d="M9 15.5 4 12l6.5-1.2L13 4.5l1.6 6.4L21 12l-6.4 2.4L13 20.5l-1.7-4.7Z" fill={fill} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <circle cx="13" cy="11.2" r="1.6" fill="#fff" opacity="0.85" />
      <rect x="11" y="17.5" width="2" height="2" fill={fill} />
      <rect x="8.6" y="19.5" width="6.8" height="1.5" rx="0.75" fill={fill} />
    </>
  );
}

function MedalStar({ fill }: { fill: string }) {
  return (
    <>
      <path
        d="M12 3.4l1.9 4 4.4 0.6-3.2 3.1 0.75 4.4L12 13.4l-3.85 2.1 0.75-4.4-3.2-3.1 4.4-0.6Z"
        fill={fill}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.5"
      />
      <rect x="11" y="16" width="2" height="2.4" fill={fill} />
      <rect x="8.2" y="18.4" width="7.6" height="1.6" rx="0.8" fill={fill} />
    </>
  );
}

const SHAPES: Record<string, (props: { fill: string }) => React.ReactNode> = {
  LEAGUE: LeagueCup,
  DOMESTIC_CUP: DomesticCup,
  CONTINENTAL: ContinentalCup,
  WORLD: WorldTrophy,
  INDIVIDUAL: MedalStar,
  BALLON_DOR: BallonDorTrophy,
  GOLDEN_BOOT: GoldenBoot,
  PUSKAS: PuskasTrophy,
};

// Returns a lookup key (a string), not a component — kept separate from the actual `SHAPES[key]`
// index access below so the component reference is always selected via a plain object lookup.
function shapeKeyForAward(tier: TrophyTier, name?: string): string {
  if (name?.startsWith(INDIVIDUAL_AWARDS.BALLON_DOR)) return "BALLON_DOR";
  if (name?.startsWith(INDIVIDUAL_AWARDS.GOLDEN_BOOT)) return "GOLDEN_BOOT";
  if (name?.startsWith(INDIVIDUAL_AWARDS.PUSKAS)) return "PUSKAS";
  return tier;
}

export function TrophyIcon({
  tier,
  name,
  size = 28,
  className = "",
}: {
  tier: TrophyTier | string;
  name?: string;
  size?: number;
  className?: string;
}) {
  const t = (tier as TrophyTier) in TIER_COLOR ? (tier as TrophyTier) : "LEAGUE";
  const Shape = SHAPES[shapeKeyForAward(t, name)];
  const color = TIER_COLOR[t];
  const gradId = `${useId()}-trophy`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={name ?? tier}
    >
      <defs>
        <Shine id={gradId} color={color} />
      </defs>
      <Shape fill={`url(#${gradId})`} />
    </svg>
  );
}
