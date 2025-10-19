import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Wolfsfera Solana Hub",
  description: "Hub informativo sobre inversiones y ecosistema Solana.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 px-4 py-10 md:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-4xl space-y-6">
              {children}
            </div>
          </main>
          <Footer />
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
