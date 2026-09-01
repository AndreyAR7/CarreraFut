import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/auth";

export default async function CarrerasLayout({ children }: LayoutProps<"/carreras">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/carreras" className="text-lg font-bold tracking-tight">
          CarreraFUT
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span>
            {user.displayName}
            {user.isGuest ? " (invitado)" : ""}
          </span>
          <form action={logoutAction}>
            <button type="submit" className="font-medium text-foreground hover:text-danger">
              Salir
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
