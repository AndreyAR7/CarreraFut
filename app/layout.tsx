import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarreraFUT",
  description: "Simulador de carrera futbolística",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
