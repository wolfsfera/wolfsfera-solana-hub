import type { Metadata } from "next";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Card } from "@/components/Card";
import { ExternalLink } from "@/components/ExternalLink";
import { PriceCard } from "@/components/PriceCard";
import { Section } from "@/components/Section";
import { TokenTable } from "@/components/TokenTable";
import {
  getPumpfunTrending,
  getSolPrice,
  getTokensBrief,
  type PumpfunTrendingItem,
} from "@/lib/data/solana";
import { buildMetadata } from "@/lib/seo";

function formatCompactCurrency(value?: number | null): string {
  if (!value || !Number.isFinite(value)) {
    return "Sin datos";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function PumpfunList({ items }: { items: PumpfunTrendingItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-neutral-400">No hay tokens destacados en este momento.</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.url} className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-white">{item.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              MC inicial: {formatCompactCurrency(item.initialMarketCap ?? undefined)}
            </p>
          </div>
          <ExternalLink href={item.url} className="text-sm font-semibold text-solana-green">
            Ver en Pump.fun
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Dashboard Solana — Wolfsfera en vivo",
    description:
      "Consulta el precio de SOL, tokens destacados y tendencias de Pump.fun con datos actualizados y fallback seguro.",
    path: "/dashboard",
  });
}

export default async function DashboardPage() {
  const [solPrice, tokensBrief, pumpfun] = await Promise.all([
    getSolPrice(),
    getTokensBrief(),
    getPumpfunTrending(),
  ]);

  const solToken = tokensBrief.tokens.find((token) => token.id === "solana");
  const marketCap = solPrice.marketCap ?? solToken?.marketCap ?? null;
  const lastUpdated = solPrice.lastUpdated ?? solToken?.lastUpdated ?? null;
  const solStale = solPrice.stale || tokensBrief.stale;

  return (
    <div className="space-y-16">
      <Section
        title="Resumen del mercado SOL"
        subtitle="Monitorea el precio actual de Solana, su variación diaria y la última marca registrada."
      >
        <PriceCard
          price={solPrice.price}
          change24h={solPrice.change24h}
          marketCap={marketCap}
          lastUpdated={lastUpdated}
          stale={solStale}
        />
      </Section>

      <Section
        title="Tokens a seguir en Solana"
        subtitle="Listado dinámico de tokens del ecosistema con precio, variación y sparkline de los últimos siete días."
      >
        <TokenTable tokens={tokensBrief.tokens} stale={tokensBrief.stale} />
      </Section>

      <Section
        title="Tendencias en Pump.fun"
        subtitle="Explora los memecoins que marcan la conversación y salta directamente a la plataforma para descubrir oportunidades."
      >
        <Card className="space-y-6">
          <PumpfunList items={pumpfun.items} />
          {pumpfun.stale ? (
            <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-300">
              Datos en caché
            </div>
          ) : null}
          <AffiliateButton
            href="https://pump.fun"
            label="Ir a Pump.fun"
            external
            utm={{ utm_source: "wolfsfera", utm_medium: "cta", utm_campaign: "dashboard" }}
          />
        </Card>
      </Section>
    </div>
  );
}
