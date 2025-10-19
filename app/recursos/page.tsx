import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Recursos Wolfsfera — Herramientas y plantillas Solana",
    description:
      "Accede a herramientas, dashboards y colecciones de enlaces curados para seguir el ritmo de las oportunidades en Solana.",
    path: "/recursos",
  });
}

export default function RecursosPage() {
  return (
    <Section
      title="Recursos"
      subtitle="Muy pronto compartiremos herramientas, dashboards y colecciones de enlaces curados para seguir el ritmo de Solana."
    >
      <p className="text-neutral-200">
        Estamos diseñando kits descargables, tutoriales y checklists accionables. Suscríbete a nuestras actualizaciones para ser de las primeras personas en explorarlos.
      </p>
    </Section>
  );
}
