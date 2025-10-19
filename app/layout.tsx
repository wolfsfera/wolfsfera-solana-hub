import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
      <body
        className={`${poppins.className} flex min-h-screen flex-col bg-transparent text-neutral-100 antialiased`}
      >
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="space-y-12">{children}</div>
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
