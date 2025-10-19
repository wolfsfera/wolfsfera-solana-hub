import type { Metadata } from "next";
import type { ReactNode } from "react";
import investmentsData from "@/data/investments.json";
import { Section } from "@/components/Section";
import { buildMetadata } from "@/lib/seo";
import { InvestmentsView } from "@/components/investments/InvestmentsView";
import { CATEGORY_LABELS } from "@/components/investments/constants";
import type { Investment } from "@/components/investments/types";

const investments = investmentsData as Investment[];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Inversiones recomendadas en Solana — Wolfsfera",
    description:
      "Explora wallets, plataformas DeFi, hardware y on-ramps del ecosistema Solana evaluadas por Wolfsfera.",
    path: "/inversiones",
  });
}

interface InversionesPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

function buildItemListSchema(items: Investment[]): ReactNode {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((investment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: investment.name,
      url: investment.url,
      item: {
        "@type": "Service",
        name: investment.name,
        url: investment.url,
        description: investment.summary,
        serviceType: CATEGORY_LABELS[investment.category],
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Categoría Wolfsfera",
            value: investment.category,
          },
          {
            "@type": "PropertyValue",
            name: "Nivel de riesgo",
            value: investment.risk,
          },
        ],
      },
    })),
  };

  return (
    <script
      key="investments-itemlist"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

export default function InversionesPage({
  searchParams = {},
}: InversionesPageProps) {
  return (
    <>
      <Section
        title="Inversiones"
        subtitle="Mapeamos servicios clave del ecosistema Solana para ayudarte a evaluar riesgos y detectar ventajas competitivas."
      >
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-200">
          Esta selección cubre herramientas esenciales para operar en Solana: wallets, protocolos DeFi, agregadores de liquidez,
          hardware wallets y rampas fiat. Ajusta los filtros para comparar opciones según tus necesidades y apetito de riesgo.
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
          Wolfsfera no ofrece asesoramiento financiero. DYOR.
        </p>
        <InvestmentsView investments={investments} initialSearchParams={searchParams} />
      </Section>
      {buildItemListSchema(investments)}
    </>
  );
}
