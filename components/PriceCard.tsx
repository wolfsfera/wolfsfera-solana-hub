import { Card } from "@/components/Card";

interface PriceCardProps {
  price: number;
  change24h: number;
  marketCap?: number | null;
  lastUpdated?: string | null;
  stale?: boolean;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatChange(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function formatTimestamp(timestamp?: string | null): string {
  if (!timestamp) {
    return "Sin datos";
  }

  try {
    return new Intl.DateTimeFormat("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  } catch (error) {
    console.warn("Invalid timestamp", error);
    return "Sin datos";
  }
}

export function PriceCard({ price, change24h, marketCap, lastUpdated, stale = false }: PriceCardProps) {
  const changeIsPositive = change24h >= 0;
  const changeClasses = changeIsPositive ? "text-solana-green" : "text-red-400";

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-dark/90 to-primary-black">
      <div className="space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-gold/70">Solana (SOL)</p>
            <h3 className="mt-2 text-4xl font-semibold text-white" aria-live="polite">
              {formatCurrency(price)}
            </h3>
          </div>
          <span
            className={`inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-sm font-medium ${changeClasses}`}
            aria-live="polite"
          >
            {formatChange(change24h)}
          </span>
        </header>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400">Capitalización de mercado</dt>
            <dd className="mt-2 text-lg font-medium text-neutral-100">
              {typeof marketCap === "number" && marketCap > 0 ? formatCurrency(marketCap) : "Sin datos"}
            </dd>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400">Última actualización</dt>
            <dd className="mt-2 text-lg font-medium text-neutral-100">{formatTimestamp(lastUpdated)}</dd>
          </div>
        </dl>
        {stale ? (
          <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-300">
            Datos en caché
          </div>
        ) : null}
      </div>
    </Card>
  );
}
