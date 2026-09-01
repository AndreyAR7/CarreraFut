"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, {});

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="displayName">
          Tu nombre
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-muted" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={6}
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-accent"
        />
      </div>

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-accent px-6 py-3 font-semibold text-black transition hover:bg-accent-strong disabled:opacity-60"
      >
        {pending ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-muted">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Iniciá sesión
        </Link>
      </p>
    </form>
  );
}
