import type { Metadata } from "next";
import { Section } from "@/components/Section";

const resourceItems = [
  "TODO — Colección de dashboards DeFi",
  "TODO — Plantillas para seguimiento de carteras",
  "TODO — Tutorial interactivo sobre staking",
  "TODO — Biblioteca de contratos de ejemplo",
  "TODO — Checklist de seguridad para lanzamientos",
  "TODO — Calendario de eventos del ecosistema",
  "TODO — Guía de herramientas de análisis on-chain",
];

export const metadata: Metadata = {
  title: "Recursos | Wolfsfera",
};

export default function RecursosPage() {
  return (
    <Section
      headingLevel="h1"
      title="Recursos Wolfsfera"
      subtitle="Estamos preparando un repositorio curado de herramientas y referencias. Mientras tanto, usa esta lista para sugerir tus prioridades."
    >
      <p>
        El equipo está catalogando utilidades prácticas para acelerar la investigación y ejecución en Solana. Comparte tus
        necesidades para ayudarnos a priorizar.
      </p>
      <ul className="list-disc space-y-2 pl-6 text-neutral-300">
        {resourceItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}
