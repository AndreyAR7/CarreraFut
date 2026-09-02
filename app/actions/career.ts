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

// These three are always followed by a client-side window.location.reload() (see
// DecisionInteractive.tsx), which is a hard navigation that never consults Next's router cache —
// so they don't need revalidatePath to show fresh data. Calling it anyway used to trigger Next's
// automatic mid-action RSC patch, which updated the page (celebration modal included) the instant
// the action resolved, well before the client's own reveal animation had finished playing.
export async function resolveClubOfferAction(careerId: string, optionKey: string) {
  const user = await requireUser();
  await resolveClubOffer(careerId, user.id, optionKey);
  await advanceSeason(careerId, user.id);
}

export async function resolveEventAction(careerId: string, optionKey: string) {
  const user = await requireUser();
  const outcome = await resolveEvent(careerId, user.id, optionKey);
  // advanceSeason() now merges into whatever celebration resolveEvent() just set (see
  // careerEngine.ts) instead of overwriting it, so a shootout's own trophy/miss can never be
  // silently replaced by an unrelated one this immediately produces — the game can stay fluid
  // (always straight into the next decision) without that conflation bug coming back.
  //
  // Some outcomes (e.g. winning the signing-trial shootout) queue a follow-up decision of their
  // own — a club offer the player has to pick from — right inside resolveEvent(). advanceSeason()
  // would throw ("Tenés una decisión pendiente") if called on top of that, so skip it whenever
  // resolving this event already left something new pending.
  const stillPending =
    (await prisma.pendingEvent.findUnique({ where: { careerId } })) ??
    (await prisma.pendingClubOffer.findUnique({ where: { careerId } }));
  if (!stillPending) {
    await advanceSeason(careerId, user.id);
  }
  return outcome;
}

export async function advanceSeasonAction(careerId: string) {
  const user = await requireUser();
  await advanceSeason(careerId, user.id);
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
