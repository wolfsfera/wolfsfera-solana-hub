import { ExternalLink } from "@/components/ExternalLink";
import { Sparkline } from "@/components/Sparkline";
import type { TokenBrief } from "@/lib/data/solana";

interface TokenTableProps {
  tokens: TokenBrief[];
  stale?: boolean;
}

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatPercentage(value: number): string {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function TokenTable({ tokens, stale = false }: TokenTableProps) {
  if (!tokens || tokens.length === 0) {
    return <p className="text-sm text-neutral-400">No hay datos disponibles en este momento.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-primary-gold/20 bg-primary-dark/60">
        <div className="hidden grid-cols-[2fr_repeat(3,1fr)] gap-6 border-b border-white/5 px-6 py-4 text-xs uppercase tracking-[0.2em] text-neutral-400 md:grid">
          <span>Token</span>
          <span className="text-right">Precio</span>
          <span className="text-right">24h</span>
          <span className="text-right">7d</span>
        </div>
        <ul className="divide-y divide-white/5">
          {tokens.map((token) => {
            const changePositive = token.change24h >= 0;
            const changeClass = changePositive ? "text-solana-green" : "text-red-400";

            return (
              <li key={token.id} className="grid grid-cols-1 gap-4 px-6 py-4 transition hover:bg-white/5 md:grid-cols-[2fr_repeat(3,1fr)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold uppercase text-primary-gold">
                    {token.symbol.slice(0, 3)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{token.name}</p>
                    <ExternalLink href={token.externalUrl} className="text-xs text-solana-green/80">
                      Ver ficha
                    </ExternalLink>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end">
                  <span className="text-base font-semibold text-neutral-100 md:text-right">{formatCurrency(token.price)}</span>
                </div>
                <div className="flex items-center justify-between md:justify-end">
                  <span className={`text-base font-semibold ${changeClass}`}>{formatPercentage(token.change24h)}</span>
                </div>
                <div className="flex items-center justify-between md:justify-end">
                  <Sparkline data={token.sparkline} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {stale ? (
        <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-300">
          Datos en caché
        </div>
      ) : null}
    </div>
  );
}
