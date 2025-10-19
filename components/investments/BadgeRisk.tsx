import type { InvestmentRisk } from "./types";

const riskLabels: Record<InvestmentRisk, string> = {
  low: "Riesgo bajo",
  mid: "Riesgo medio",
  high: "Riesgo alto",
};

const riskStyles: Record<InvestmentRisk, string> = {
  low: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
  mid: "border-amber-400/40 bg-amber-500/20 text-amber-200",
  high: "border-red-400/40 bg-red-500/20 text-red-200",
};

interface BadgeRiskProps {
  level: InvestmentRisk;
}

export function BadgeRisk({ level }: BadgeRiskProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-widest ${riskStyles[level]}`}
      aria-label={riskLabels[level]}
    >
      {riskLabels[level]}
    </span>
  );
}
