"use client";

import { useState } from "react";
import { TrophyIcon } from "./TrophyIcon";
import { TrophyTier } from "@/lib/game/types";

export interface TrophyDetail {
  id: string;
  name: string;
  tier: string;
  age: number;
}

// The header/summary only ever showed a grouped icon+count chip, losing exactly which trophy was
// won and at what age — this expands into the full list on demand instead of cluttering the
// compact view by default.
export function TrophyDetails({ trophies }: { trophies: TrophyDetail[] }) {
  const [expanded, setExpanded] = useState(false);
  if (trophies.length === 0) return null;

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="text-xs font-semibold text-gold underline decoration-dotted underline-offset-2"
      >
        {expanded ? "Ocultar detalle ▲" : "Ver detalle exacto ▾"}
      </button>
      {expanded && (
        <ul className="mt-2 flex max-h-64 flex-col gap-1 overflow-y-auto rounded-lg bg-background/50 p-2 text-xs">
          {trophies.map((t) => (
            <li key={t.id} className="flex items-center gap-2 rounded px-1 py-0.5">
              <TrophyIcon tier={t.tier as TrophyTier} name={t.name} size={16} />
              <span className="flex-1 font-medium">{t.name}</span>
              <span className="shrink-0 text-muted">a los {t.age} años</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
