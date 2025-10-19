import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Inversiones en Solana — Estrategias Wolfsfera",
    description:
      "Explora análisis, métricas y frameworks para tomar decisiones inteligentes en el ecosistema de inversiones de Solana.",
    path: "/inversiones",
  });
}

export default function InversionesPage() {
  return (
    <Section
      title="Inversiones"
      subtitle="Estamos compilando estrategias, análisis y herramientas para navegar las oportunidades del ecosistema Solana."
    >
      <p className="text-neutral-200">
        Próximamente encontrarás breakdowns de proyectos, métricas clave y recursos educativos diseñados para ayudarte a evaluar riesgos y gestionar tu cartera con precisión.
      </p>
    </Section>
  );
}
