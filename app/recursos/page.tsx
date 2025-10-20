import type { Metadata } from "next";
import type { ReactNode } from "react";
import resourcesData from "@/data/resources.json";
import { Section } from "@/components/Section";
import { buildMetadata } from "@/lib/seo";
import { CTASection } from "@/components/CTASection";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import type { Resource } from "@/components/ResourceCard";

const resources = resourcesData as Resource[];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Recursos recomendados en Solana — Wolfsfera",
    description:
      "Explora wallets, guías y herramientas verificadas por Wolfsfera. Filtra por categoría y accede solo a dominios aprobados.",
    path: "/recursos",
  });
}

function buildItemListSchema(items: Resource[]): ReactNode {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((resource, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: resource.name,
      url: resource.url,
      item: {
        "@type": "WebSite",
        name: resource.name,
        url: resource.url,
        description: resource.summary,
      },
    })),
  };

  return (
    <script
      key="resources-itemlist"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RecursosPage() {
  return (
    <>
      <Section
        headingLevel="h1"
        title="Recursos Wolfsfera"
        subtitle="Curamos enlaces confiables del ecosistema Solana y validamos cada dominio antes de recomendarlo."
      >
        <p>
          Esta biblioteca reúne wallets, herramientas DeFi, intercambios y guías educativas listas para tu due diligence. Usa el
          filtro para explorar por categoría y confía en que cada enlace respeta la whitelist de seguridad de Wolfsfera.
        </p>
        <ResourceExplorer resources={resources} />
        <CTASection
          title="Impulsa tus lanzamientos en Pump.fun"
          subtitle="Monitorea tendencias y lanza en minutos con soporte de la comunidad Wolfsfera."
          href="https://pump.fun"
          label="Ir a Pump.fun"
          external
          utm={{ utm_source: "wolfsfera", utm_medium: "cta", utm_campaign: "recursos" }}
        />
      </Section>
      {buildItemListSchema(resources)}
    </>
  );
}
