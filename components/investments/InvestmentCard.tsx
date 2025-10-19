import { AffiliateButton } from "@/components/AffiliateButton";
import { extractDomain, isDomainAllowed } from "@/components/ExternalLink";
import { BadgeRisk } from "./BadgeRisk";
import { CATEGORY_LABELS } from "./constants";
import type { Investment } from "./types";

const categoryStyles: Record<Investment["category"], string> = {
  staking: "border-solana-green/40 bg-solana-green/10 text-solana-green",
  wallet: "border-primary-gold/40 bg-primary-gold/10 text-primary-gold",
  exchange: "border-sky-400/40 bg-sky-500/10 text-sky-300",
  hardware: "border-neutral-300/30 bg-neutral-100/10 text-neutral-100",
  "fiat-onramp": "border-amber-400/40 bg-amber-500/10 text-amber-200",
};

interface InvestmentCardProps {
  investment: Investment;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  const domain = extractDomain(investment.url);
  const whitelistMatches = domain === investment.whitelistDomain;
  const isAllowed = whitelistMatches && isDomainAllowed(investment.whitelistDomain);
  const disabledReason = isAllowed ? undefined : "Dominio no permitido";

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-primary-gold/20 bg-primary-dark/70 p-6 shadow-golden-glow">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl font-semibold text-white">{investment.name}</span>
            <BadgeRisk level={investment.risk} />
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 ${categoryStyles[investment.category]}`}>
              {CATEGORY_LABELS[investment.category]}
            </span>
            <span className="rounded-full border border-neutral-500/40 px-3 py-1 text-neutral-300">
              {investment.whitelistDomain}
            </span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-neutral-200">{investment.summary}</p>
      </div>
      <div className="mt-6">
        <AffiliateButton
          href={investment.url}
          label="Ver detalles"
          external
          trackingCategory={investment.category}
          disabled={!isAllowed}
          disabledReason={disabledReason}
          className="w-full justify-center"
        />
      </div>
    </article>
  );
}
