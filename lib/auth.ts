import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { prisma } from "./prisma";

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "carrerafut_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string): Promise<void> {
  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
    },
  });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: session.expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (sessionId) {
    await prisma.session.deleteMany({ where: { id: sessionId } });
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Cached per-request (React's cache(), not a persistent cache) so every layout/page that calls
// this during the same render sees the exact same result from one DB lookup — without it, a
// layout's guard and a page's own independent call could each hit the database separately and,
// under a race (e.g. the session expiring/being deleted between the two), disagree with each
// other. That's exactly what caused app/carreras/page.tsx to crash on a null user despite the
// layout above it having already confirmed one was logged in.
export const getCurrentUser = cache(async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    }
    return null;
  }

  return session.user;
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No autenticado");
  }
  return user;
}
