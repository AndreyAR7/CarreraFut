import { EventCategory } from "@/lib/game/types";

// One drawn banner per decision category — no stock photography (nobody to license it from,
// and depicting real-looking people in a "shady bribe" scene would be its own bad idea), just a
// consistent set of sports-editorial icons over a category-colored gradient.
const THEME: Record<
  EventCategory,
  { from: string; to: string; icon: (id: string) => React.ReactNode }
> = {
  DISCIPLINA: {
    from: "#450a0a",
    to: "#b91c1c",
    icon: () => (
      <g stroke="rgba(255,255,255,0.92)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="61" y="30" width="26" height="36" rx="3" fill="rgba(255,255,255,0.14)" transform="rotate(-10 74 48)" />
        <path d="M40 76c6-10 14-16 20-16" />
        <path d="M28 66c4-14 12-24 20-28" opacity="0.6" />
      </g>
    ),
  },
  SALUD: {
    from: "#022c22",
    to: "#0d9488",
    icon: () => (
      <g stroke="rgba(255,255,255,0.92)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M22 54h14l6-14 8 26 6-16 5 4h17" />
        <path d="M62 34c8-8 20-3 20 6 0 10-12 16-20 24-8-8-20-14-20-24 0-9 12-14 20-6Z" fill="rgba(255,255,255,0.12)" />
      </g>
    ),
  },
  ENTRENAMIENTO: {
    from: "#431407",
    to: "#d97706",
    icon: () => (
      <g stroke="rgba(255,255,255,0.92)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M26 50h48" />
        <rect x="18" y="42" width="10" height="16" rx="2" fill="rgba(255,255,255,0.16)" />
        <rect x="72" y="42" width="10" height="16" rx="2" fill="rgba(255,255,255,0.16)" />
        <rect x="12" y="45" width="6" height="10" rx="1.5" fill="rgba(255,255,255,0.24)" />
        <rect x="82" y="45" width="6" height="10" rx="1.5" fill="rgba(255,255,255,0.24)" />
      </g>
    ),
  },
  PERSONAL: {
    from: "#3b0764",
    to: "#a855f7",
    icon: () => (
      <g stroke="rgba(255,255,255,0.92)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M25 58V38l25-16 25 16v20" fill="rgba(255,255,255,0.12)" />
        <path d="M37 58V44h16v14" />
        <path d="M50 30c5-7 15-7 15 1 0 7-8 11-15 17-7-6-15-10-15-17 0-8 10-8 15-1Z" fill="rgba(255,255,255,0.18)" />
      </g>
    ),
  },
  MEDIA: {
    from: "#082f49",
    to: "#0ea5e9",
    icon: () => (
      <g stroke="rgba(255,255,255,0.92)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="44" y="24" width="12" height="26" rx="6" fill="rgba(255,255,255,0.16)" />
        <path d="M34 42a16 16 0 0 0 32 0" />
        <path d="M50 58v10M42 68h16" />
        <path d="M74 30l8-6M76 40h10M73 50l8 5" opacity="0.7" />
      </g>
    ),
  },
  SELECCION: {
    from: "#1e1b4b",
    to: "#4338ca",
    icon: () => (
      <g stroke="rgba(255,255,255,0.92)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M35 26h30l6 8-6 34H35l-6-34Z" fill="rgba(255,255,255,0.12)" />
        <path d="M50 26v42M35 26l-9-6M65 26l9-6" />
        <path
          d="M50 40l3.6 7.4 8.1 1.2-5.9 5.7 1.4 8.1-7.2-3.8-7.2 3.8 1.4-8.1-5.9-5.7 8.1-1.2Z"
          fill="rgba(255,255,255,0.3)"
        />
      </g>
    ),
  },
  FINANZAS: {
    from: "#422006",
    to: "#eab308",
    icon: () => (
      <g stroke="rgba(255,255,255,0.92)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <ellipse cx="38" cy="60" rx="16" ry="7" fill="rgba(255,255,255,0.16)" />
        <ellipse cx="38" cy="52" rx="16" ry="7" fill="rgba(255,255,255,0.16)" />
        <ellipse cx="38" cy="44" rx="16" ry="7" fill="rgba(255,255,255,0.2)" />
        <path d="M62 58l10-22 10 8" />
        <path d="M64 36h10v10" />
      </g>
    ),
  },
};

export function EventIllustration({ category, className = "" }: { category: EventCategory; className?: string }) {
  const theme = THEME[category];
  const gradientId = `event-grad-${category}`;

  return (
    <svg viewBox="0 0 100 84" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.from} />
          <stop offset="100%" stopColor={theme.to} />
        </linearGradient>
      </defs>
      <rect width="100" height="84" fill={`url(#${gradientId})`} />
      <circle cx="88" cy="10" r="30" fill="rgba(255,255,255,0.05)" />
      <circle cx="6" cy="78" r="22" fill="rgba(0,0,0,0.12)" />
      {theme.icon(gradientId)}
    </svg>
  );
}
