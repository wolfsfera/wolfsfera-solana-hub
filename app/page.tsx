import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

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
    </Section>
  );
}
