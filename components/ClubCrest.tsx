// Where we have a real crest (public/crests, sourced from the open FCLOGO/fclogo.top
// collection — see public/crests/CREDITS.md) it's used as-is. Otherwise we fall back to a
// generated shield: the club's own primaryColor plus its short name, so every club still looks
// distinct instead of showing a broken image.
export function ClubCrest({
  color,
  label,
  src,
  size = 32,
  className = "",
}: {
  color: string;
  label: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size crest, not worth next/image's overhead
      <img
        src={src}
        alt={label}
        width={size}
        height={size}
        className={`shrink-0 rounded-sm object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = label.slice(0, 3).toUpperCase();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 44"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={label}
    >
      <path
        d="M20 1.5 L37 7.5 V21 C37 32.5 30 40 20 42.5 C10 40 3 32.5 3 21 V7.5 Z"
        fill={color}
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.4"
      />
      <path
        d="M20 1.5 L37 7.5 V21 C37 32.5 30 40 20 42.5 Z"
        fill="rgba(255,255,255,0.14)"
      />
      <path
        d="M20 1.5 L3 7.5 V21 C3 32.5 10 40 20 42.5 Z"
        fill="rgba(0,0,0,0.08)"
      />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="800"
        fill="white"
        fontFamily="system-ui, sans-serif"
        style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.45)", strokeWidth: 2 }}
      >
        {initials}
      </text>
    </svg>
  );
}
