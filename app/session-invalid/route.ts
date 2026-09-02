import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

// A session cookie can exist while the session row it points to doesn't (expired and cleaned
// up, or the underlying database was reset/migrated) — proxy.ts only checks cookie *presence*,
// so it can't tell the difference and will keep bouncing /login <-> /carreras forever. A plain
// Server Component (layout/page) can detect the mismatch but can't clear the cookie itself
// (cookies().delete() is only allowed in a Server Action or Route Handler), so it redirects here
// instead of straight to /login — this clears the stale cookie first, which breaks the loop.
export async function GET(request: Request) {
  await destroySession();
  return NextResponse.redirect(new URL("/login", request.url));
}
