"use client";

import type {
  InvestmentCategory,
  InvestmentRisk,
} from "@/components/investments/types";

const riskOptions: Array<{ value: InvestmentRisk | "all"; label: string }> = [
  { value: "all", label: "Todos los riesgos" },
  { value: "low", label: "Riesgo bajo" },
  { value: "mid", label: "Riesgo medio" },
  { value: "high", label: "Riesgo alto" },
];

const sortOptions = [
  { value: "name-asc", label: "Nombre A → Z" },
  { value: "name-desc", label: "Nombre Z → A" },
];

interface InvestmentFiltersProps {
  categories: Array<{ value: InvestmentCategory; label: string }>;
  selectedCategories: InvestmentCategory[];
  onCategoryToggle: (category: InvestmentCategory) => void;
  selectedRisk: InvestmentRisk | "all";
  onRiskChange: (risk: InvestmentRisk | "all") => void;
  sortOrder: "name-asc" | "name-desc";
  onSortChange: (order: "name-asc" | "name-desc") => void;
}

export function InvestmentFilters({
  categories,
  selectedCategories,
  onCategoryToggle,
  selectedRisk,
  onRiskChange,
  sortOrder,
  onSortChange,
}: InvestmentFiltersProps) {
  return (
    <section className="rounded-3xl border border-primary-gold/20 bg-primary-dark/70 p-6 shadow-golden-glow">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Categorías
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.value);
                return (
                  <button
                    key={category.value}
                    type="button"
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold ${
                      isSelected
                        ? "border-primary-gold bg-primary-gold/20 text-primary-gold"
                        : "border-neutral-600 text-neutral-300 hover:border-primary-gold/60 hover:text-primary-gold"
                    }`}
                    onClick={() => onCategoryToggle(category.value)}
                    aria-pressed={isSelected}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Riesgo
            </p>
            <div className="mt-2 flex flex-wrap gap-4" role="radiogroup" aria-label="Filtrar por riesgo">
              {riskOptions.map((option) => {
                const inputId = `risk-${option.value}`;
                return (
                  <label
                    key={option.value}
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2 text-sm text-neutral-200"
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name="risk"
                      value={option.value}
                      checked={selectedRisk === option.value}
                      onChange={() => onRiskChange(option.value)}
                      className="h-4 w-4 cursor-pointer accent-primary-gold"
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-60">
          <label
            htmlFor="investment-sort"
            className="block text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400"
          >
            Ordenar por
          </label>
          <select
            id="investment-sort"
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value as "name-asc" | "name-desc")}
            className="mt-2 w-full rounded-full border border-primary-gold/30 bg-primary-black px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-100 focus:border-primary-gold focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-primary-black text-neutral-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
