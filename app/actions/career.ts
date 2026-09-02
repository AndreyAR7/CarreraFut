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
  SHOOTOUT_EVENT_KEYS,
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
  // Read the eventKey before resolveEvent() runs — it deletes the PendingEvent row as part of
  // resolving it, so this is the last chance to know what kind of decision this was.
  const pending = await prisma.pendingEvent.findUnique({ where: { careerId }, select: { eventKey: true } });
  const isShootout = pending ? SHOOTOUT_EVENT_KEYS.has(pending.eventKey) : false;

  const outcome = await resolveEvent(careerId, user.id, optionKey);
  // A shootout's own result (won/missed a title, promoted to a club) needs to stand on its own —
  // immediately auto-simulating the next season here could hand out an unrelated trophy in the
  // very same reload, making it look like the shootout itself produced it. The player advances
  // manually afterward via the normal "Avanzar temporada" button instead.
  if (!isShootout) {
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
