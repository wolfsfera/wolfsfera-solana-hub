import type { Metadata } from "next";
import { Section } from "@/components/Section";

const glossaryItems = [
  "TODO — Definir staking líquido",
  "TODO — Añadir guía de wallets autocustodia",
  "TODO — Explicar métricas clave de TVL",
  "TODO — Incluir pasos para auditar contratos",
  "TODO — Describir cómo funcionan los RPC",
  "TODO — Documentar la gestión de llaves",
  "TODO — Resumir el flujo de un airdrop",
  "TODO — Enumerar riesgos de liquidez",
];

export const metadata: Metadata = {
  title: "Glosario | Wolfsfera",
};

export default function GlosarioPage() {
  return (
    <Section
      headingLevel="h1"
      title="Glosario Wolfsfera"
      subtitle="Este glosario está en construcción. Usa esta lista provisional para seguir los temas que documentaremos."
    >
      <p>
        Estamos recopilando conceptos fundamentales del ecosistema Solana para ofrecer definiciones claras y accionables. El
        contenido definitivo se sumará en una próxima iteración.
      </p>
      <ul className="list-disc space-y-2 pl-6 text-neutral-300">
        {glossaryItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}
