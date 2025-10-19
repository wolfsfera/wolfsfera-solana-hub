import type { Metadata } from "next";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Pump.fun — Memecoins y tendencias en Solana",
    description:
      "Analiza memecoins, liquidez inicial y métricas en tiempo real de Pump.fun con la guía táctica de Wolfsfera.",
    path: "/pumpfun",
  });
}

const bulletPoints = [
  "Lanzamientos instantáneos con liquidez inicial programática.",
  "Métricas en vivo para detectar momentum de la comunidad.",
  "Integración directa con billeteras Solana de bajo coste.",
];

export default function PumpFunPage() {
  return (
    <div className="space-y-16">
      <Section
        title="Explora las memecoins más salvajes de Solana 🐺⚡"
        subtitle="Pump.fun es el laboratorio donde nacen los tokens más virales del ecosistema. Analiza oportunidades, monitoriza tendencias y actúa con responsabilidad."
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-5">
            <p className="text-lg text-neutral-200">
              Sigue el pulso del mercado memecoin con dashboards en tiempo real, curvas de liquidez automatizadas y herramientas para inversores que buscan velocidad sin perder el control.
            </p>
            <AffiliateButton href="https://pump.fun" label="Ir a Pump.fun" external />
          </div>
          <Card className="flex-1 space-y-4">
            <h3 className="text-xl font-semibold text-primary-gold">¿Qué es Pump.fun?</h3>
            <ul className="space-y-3 text-sm text-neutral-200">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-solana-green shadow-[0_0_12px_rgba(20,241,149,0.6)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
      <section aria-label="Aviso legal" className="rounded-2xl border border-primary-gold/20 bg-primary-dark/70 p-6 text-sm text-neutral-300">
        <p>Inversión bajo tu propia responsabilidad. No constituye asesoramiento financiero. DYOR.</p>
      </section>
    </div>
  );
}
