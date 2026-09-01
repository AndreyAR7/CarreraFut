"use client";

import { clearCelebrationAction } from "@/app/actions/career";
import { TrophyIcon } from "@/components/TrophyIcon";
import { TrophyTier } from "@/lib/game/types";

const CONFETTI_COLORS = [
  "#22c55e",
  "#fbbf24",
  "#3b82f6",
  "#ec4899",
  "#a855f7",
  "#ef4444",
  "#f59e0b",
  "#ffffff",
];

interface CelebrationData {
  trophies: { name: string; tier: string }[];
  retiring?: boolean;
}

// Deterministic pseudo-random in [0, 1) from an integer seed — keeps the component a pure
// function of its props (no Math.random/Date.now) while still looking scattered.
//
// This must be bit-identical between the server render and the client's hydration render, or
// React flags a hydration mismatch (which is exactly what happened here). Math.sin()/Math.cos()
// are deterministic but NOT guaranteed to return identical floats across every JS engine/platform
// — Node's V8 build and a browser's can differ in the last bits of a transcendental function's
// result. Integer-only bitwise arithmetic (a standard "mulberry32"-style hash) has no such
// ambiguity: every conforming JS engine performs it identically.
function pseudoRandom(seed: number): number {
  let t = (Math.floor(seed * 1000) + 0x9e3779b9) | 0;
  t = Math.imul(t ^ (t >>> 16), 0x21f0aaad);
  t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
  t = (t ^ (t >>> 15)) >>> 0;
  return t / 4294967296;
}

const CONFETTI_PIECES = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  left: pseudoRandom(i * 3.1) * 100,
  delay: pseudoRandom(i * 7.7) * 0.6,
  duration: 2.6 + pseudoRandom(i * 5.3) * 1.8,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  width: 6 + pseudoRandom(i * 2.9) * 6,
  height: 10 + pseudoRandom(i * 9.1) * 10,
  isStreamer: i % 3 === 0,
  rotate: pseudoRandom(i * 4.4) * 360,
}));

function ConfettiField() {
  const pieces = CONFETTI_PIECES;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.isStreamer ? 4 : p.width,
            height: p.isStreamer ? 22 : p.height,
            backgroundColor: p.color,
            borderRadius: p.isStreamer ? 2 : 3,
            transform: `rotate(${p.rotate}deg)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Celebration({ careerId, data }: { careerId: string; data: CelebrationData }) {
  const { trophies, retiring } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <ConfettiField />
      <div className="pop-in relative z-[61] w-full max-w-sm rounded-2xl border border-gold/50 bg-surface p-6 text-center shadow-2xl">
        <div className="trophy-bounce flex justify-center">
          {trophies.length > 0 ? (
            <TrophyIcon tier={trophies[0].tier as TrophyTier} name={trophies[0].name} size={72} />
          ) : (
            <span className="text-6xl">🎉</span>
          )}
        </div>
        <h2 className="mt-3 text-xl font-extrabold text-gold">
          {retiring ? "¡Última temporada de gloria!" : "¡Festejo de vestuario!"}
        </h2>
        <div className="mt-4 flex flex-col gap-2">
          {trophies.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg bg-surface-alt px-3 py-2 text-left text-sm font-semibold"
            >
              <TrophyIcon tier={t.tier as TrophyTier} name={t.name} size={24} />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">🎊 🎉 🥳 ¡Toda la oficina te felicita! 🥳 🎉 🎊</p>
        <form action={clearCelebrationAction.bind(null, careerId)} className="mt-5">
          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-3 font-bold text-black transition hover:brightness-110"
          >
            ¡Genial! Seguir
          </button>
        </form>
      </div>
    </div>
  );
}
