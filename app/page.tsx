import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { buildMetadata } from "@/lib/seo";
import { AffiliateButton } from "@/components/AffiliateButton";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Wolfsfera Solana Hub — Estrategias y recursos Solana",
    description:
      "Descubre guías, herramientas y señales del ecosistema Solana para invertir e informarte con la comunidad Wolfsfera.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <Section
      title="Bienvenido a Wolfsfera Solana Hub"
      subtitle="Centralizamos recursos, herramientas y señales del ecosistema Solana para ayudarte a tomar decisiones informadas. Esta plataforma evoluciona con la comunidad."
    >
      <p className="text-neutral-200">
        Estamos preparando guías de inversión, breakdowns de proyectos emergentes y tutoriales prácticos para que avances con confianza. Navega por las secciones y vuelve pronto para descubrir las novedades.
      </p>
      <div className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/inversiones"
          className="inline-flex items-center justify-center rounded-full border border-primary-gold/40 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-gold transition hover:-translate-y-0.5 hover:border-primary-gold/70 hover:text-white"
        >
          Inversiones
        </Link>
        <AffiliateButton
          href="https://pump.fun"
          label="Pump.fun"
          external
          utm={{ utm_source: "wolfsfera", utm_medium: "cta", utm_campaign: "home" }}
        />
        <Link
          href="/recursos"
          className="inline-flex items-center justify-center rounded-full border border-primary-gold/40 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-gold transition hover:-translate-y-0.5 hover:border-primary-gold/70 hover:text-white"
        >
          Recursos
        </Link>
      </div>
    </Section>
  );
}
