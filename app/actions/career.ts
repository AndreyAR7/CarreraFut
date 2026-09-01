"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import {
  advanceSeason,
  createCareer,
  resolveClubOffer,
  resolveEvent,
} from "@/lib/game/careerEngine";
import { prisma } from "@/lib/prisma";
import { DIFFICULTY_INFO, POSITIONS } from "@/lib/game/types";

export interface CareerFormState {
  error?: string;
}

const createCareerSchema = z.object({
  lastName: z.string().trim().min(2, "Ingresá un apellido.").max(24),
  jerseyNumber: z.coerce.number().int().min(1).max(99),
  foot: z.enum(["IZQUIERDA", "DERECHA"]),
  nationalityId: z.string().min(1, "Elegí una nacionalidad."),
  position: z.enum(POSITIONS as [string, ...string[]]),
  difficulty: z.enum(Object.keys(DIFFICULTY_INFO) as [string, ...string[]]),
});

export async function createCareerAction(
  _prevState: CareerFormState,
  formData: FormData,
): Promise<CareerFormState> {
  const user = await requireUser();

  const parsed = createCareerSchema.safeParse({
    lastName: formData.get("lastName"),
    jerseyNumber: formData.get("jerseyNumber"),
    foot: formData.get("foot"),
    nationalityId: formData.get("nationalityId"),
    position: formData.get("position"),
    difficulty: formData.get("difficulty"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const career = await createCareer(user.id, parsed.data as typeof parsed.data & {
    foot: "IZQUIERDA" | "DERECHA";
    position: (typeof POSITIONS)[number];
    difficulty: keyof typeof DIFFICULTY_INFO;
  });

  redirect(`/carreras/${career.id}`);
}

export async function resolveClubOfferAction(careerId: string, optionKey: string) {
  const user = await requireUser();
  await resolveClubOffer(careerId, user.id, optionKey);
  await advanceSeason(careerId, user.id);
  revalidatePath(`/carreras/${careerId}`);
}

export async function resolveEventAction(careerId: string, optionKey: string) {
  const user = await requireUser();
  const outcome = await resolveEvent(careerId, user.id, optionKey);
  await advanceSeason(careerId, user.id);
  revalidatePath(`/carreras/${careerId}`);
  return outcome;
}

export async function advanceSeasonAction(careerId: string) {
  const user = await requireUser();
  await advanceSeason(careerId, user.id);
  revalidatePath(`/carreras/${careerId}`);
}

export async function clearCelebrationAction(careerId: string) {
  const user = await requireUser();
  await prisma.playerCareer.updateMany({
    where: { id: careerId, userId: user.id },
    data: { celebrationJson: null },
  });
  revalidatePath(`/carreras/${careerId}`);
}

export async function deleteCareerAction(careerId: string) {
  const user = await requireUser();
  await prisma.playerCareer.deleteMany({ where: { id: careerId, userId: user.id } });
  revalidatePath("/carreras");
}
