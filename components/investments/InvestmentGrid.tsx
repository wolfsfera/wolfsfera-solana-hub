import { InvestmentCard } from "./InvestmentCard";
import type { Investment } from "./types";

interface InvestmentGridProps {
  investments: Investment[];
}

export function InvestmentGrid({ investments }: InvestmentGridProps) {
  if (investments.length === 0) {
    return (
      <div className="rounded-3xl border border-primary-gold/20 bg-primary-dark/70 p-10 text-center text-sm text-neutral-300">
        No hay resultados con esos filtros.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {investments.map((investment) => (
        <InvestmentCard key={investment.id} investment={investment} />
      ))}
    </div>
  );
}
