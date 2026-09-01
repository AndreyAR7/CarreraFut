"use client";

import { useActionState, useState } from "react";
import { createCareerAction } from "@/app/actions/career";
import { Flag } from "@/components/Flag";
import { DIFFICULTY_INFO, Difficulty, Position } from "@/lib/game/types";

interface Props {
  countries: { id: string; name: string; flag: string; code: string }[];
}

const PITCH_LAYOUT: { position: Position; top: string; left: string }[] = [
  { position: "EI", top: "8%", left: "18%" },
  { position: "DC", top: "8%", left: "50%" },
  { position: "ED", top: "8%", left: "82%" },
  { position: "MCO", top: "24%", left: "50%" },
  { position: "MI", top: "40%", left: "18%" },
  { position: "MC", top: "40%", left: "50%" },
  { position: "MD", top: "40%", left: "82%" },
  { position: "MCD", top: "56%", left: "50%" },
  { position: "LI", top: "74%", left: "18%" },
  { position: "DFC", top: "74%", left: "50%" },
  { position: "LD", top: "74%", left: "82%" },
  { position: "POR", top: "90%", left: "50%" },
];

export function CareerCreationForm({ countries }: Props) {
  const [state, formAction, pending] = useActionState(createCareerAction, {});
  const [position, setPosition] = useState<Position>("DC");
  const [foot, setFoot] = useState<"IZQUIERDA" | "DERECHA">("DERECHA");
  const [difficulty, setDifficulty] = useState<Difficulty>("NORMAL");
  const [nationalityId, setNationalityId] = useState(countries[0]?.id ?? "");
  const selectedCountry = countries.find((c) => c.id === nationalityId);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-8">
      <input type="hidden" name="position" value={position} />
      <input type="hidden" name="foot" value={foot} />
      <input type="hidden" name="difficulty" value={difficulty} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="lastName">
            Apellido
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            maxLength={24}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 uppercase outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted" htmlFor="jerseyNumber">
            Número
          </label>
          <input
            id="jerseyNumber"
            name="jerseyNumber"
            type="number"
            min={1}
            max={99}
            defaultValue={10}
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm text-muted">Pierna hábil</p>
        <div className="flex gap-2">
          {(["IZQUIERDA", "DERECHA"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFoot(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                foot === f ? "bg-accent text-black" : "bg-surface text-muted hover:text-foreground"
              }`}
            >
              {f === "IZQUIERDA" ? "Izquierda" : "Derecha"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted" htmlFor="nationalityId">
          Nacionalidad
        </label>
        <select
          id="nationalityId"
          name="nationalityId"
          required
          value={nationalityId}
          onChange={(e) => setNationalityId(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-accent"
        >
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
        {selectedCountry && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-surface-alt px-3 py-2 text-sm">
            <Flag code={selectedCountry.code} size="1.4em" />
            <span className="font-medium">{selectedCountry.name}</span>
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm text-muted">Posición</p>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-xs rounded-2xl border border-border bg-[#0f2f1c]">
          <div className="absolute inset-4 rounded-lg border border-white/10" />
          {PITCH_LAYOUT.map(({ position: pos, top, left }) => (
            <button
              key={pos}
              type="button"
              onClick={() => setPosition(pos)}
              style={{ top, left, transform: "translate(-50%, -50%)" }}
              className={`absolute flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold transition ${
                position === pos
                  ? "bg-accent text-black"
                  : "bg-black/50 text-white hover:bg-black/70"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm text-muted">Intensidad de la carrera</p>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(DIFFICULTY_INFO) as Difficulty[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setDifficulty(key)}
              className={`rounded-lg border px-3 py-3 text-left text-sm transition ${
                difficulty === key
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface hover:border-muted"
              }`}
            >
              <p className="font-semibold">{DIFFICULTY_INFO[key].label}</p>
              <p className="mt-1 text-xs text-muted">{DIFFICULTY_INFO[key].description}</p>
            </button>
          ))}
        </div>
      </div>

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:bg-accent-strong disabled:opacity-60"
      >
        {pending ? "Creando..." : "Comenzar carrera"}
      </button>
    </form>
  );
}
