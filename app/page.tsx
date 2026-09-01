import Link from "next/link";
import { redirect } from "next/navigation";
import { guestLoginAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/carreras");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          ⚽ Simulador de carrera 🏆
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          🎉 CarreraFUT 🎊
        </h1>
        <p className="mt-4 text-lg text-muted">
          Construí tu carrera futbolística. Elegí tu identidad, tomá decisiones clave y dejá
          que el destino te lleve a una trayectoria única de títulos 🏆, estadísticas 📊 y
          momentos decisivos 🔥.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/register"
            className="rounded-full bg-accent px-6 py-3 text-center font-semibold text-black transition hover:bg-accent-strong"
          >
            Crear cuenta
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-border px-6 py-3 text-center font-semibold transition hover:bg-surface"
          >
            Iniciar sesión
          </Link>
          <form action={guestLoginAction}>
            <button
              type="submit"
              className="w-full rounded-full px-6 py-3 text-center font-medium text-muted transition hover:text-foreground"
            >
              Jugar como invitado (no guarda entre dispositivos)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
