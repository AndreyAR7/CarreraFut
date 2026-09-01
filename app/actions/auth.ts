"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface AuthFormState {
  error?: string;
}

const registerSchema = z.object({
  displayName: z.string().trim().min(2, "El nombre tiene que tener al menos 2 caracteres."),
  email: z.string().trim().toLowerCase().email("Ingresá un email válido."),
  password: z.string().min(6, "La contraseña tiene que tener al menos 6 caracteres."),
});

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = registerSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const { displayName, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Ya existe una cuenta con ese email." };
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { displayName, email, passwordHash },
  });

  await createSession(user.id);
  redirect("/carreras");
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Ingresá un email válido."),
  password: z.string().min(1, "Ingresá tu contraseña."),
});

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Email o contraseña incorrectos." };
  }

  await createSession(user.id);
  redirect("/carreras");
}

export async function guestLoginAction(): Promise<void> {
  const guestNumber = Math.floor(Math.random() * 90000) + 10000;
  const user = await prisma.user.create({
    data: {
      displayName: `Invitado${guestNumber}`,
      isGuest: true,
    },
  });
  await createSession(user.id);
  redirect("/carreras");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}
