import { flagIconKey } from "@/lib/game/flags";

export function Flag({
  code,
  size = "1.1em",
  className = "",
  title,
}: {
  code: string;
  size?: string | number;
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`fi fi-${flagIconKey(code)} inline-block rounded-[2px] align-middle shadow-sm ${className}`}
      style={{ fontSize: size }}
      title={title}
      aria-hidden={title ? undefined : true}
    />
  );
}
