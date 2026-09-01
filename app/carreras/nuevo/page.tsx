import { prisma } from "@/lib/prisma";
import { CareerCreationForm } from "./CareerCreationForm";

export default async function NuevaCarreraPage() {
  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold">Definí tu identidad</h1>
      <p className="mt-1 text-sm text-muted">
        Elegí tu origen, tomá decisiones clave y dejá que el destino te lleve a una trayectoria
        única de títulos, estadísticas y momentos decisivos.
      </p>
      <CareerCreationForm
        countries={countries.map((c) => ({ id: c.id, name: c.name, flag: c.flag, code: c.code }))}
      />
    </div>
  );
}
