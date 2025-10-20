"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { InvestmentFilters } from "./InvestmentFilters";
import { InvestmentGrid } from "./InvestmentGrid";
import { CATEGORY_LABELS } from "./constants";
import type {
  Investment,
  InvestmentCategory,
  InvestmentRisk,
} from "./types";

const SORT_DEFAULT = "name-asc" as const;

type SortOrder = typeof SORT_DEFAULT | "name-desc";

type SearchParams = Record<string, string | string[] | undefined>;

function parseCategories(
  value: SearchParams["categories"],
  validCategories: Set<InvestmentCategory>,
): InvestmentCategory[] {
  if (!value) {
    return [];
  }

  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw
    .split(",")
    .map((item) => item.trim() as InvestmentCategory)
    .filter((item): item is InvestmentCategory => validCategories.has(item));
}

function parseRisk(value: SearchParams["risk"]): InvestmentRisk | "all" {
  if (!value) {
    return "all";
  }

  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "low" || raw === "mid" || raw === "high" ? raw : "all";
}

function parseSort(value: SearchParams["sort"]): SortOrder {
  if (!value) {
    return SORT_DEFAULT;
  }

  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "name-desc" ? "name-desc" : SORT_DEFAULT;
}

function buildQueryString(
  categories: InvestmentCategory[],
  risk: InvestmentRisk | "all",
  sort: SortOrder,
): string {
  const params = new URLSearchParams();

  if (categories.length > 0) {
    const sortedCategories = [...new Set(categories)].sort((a, b) =>
      CATEGORY_LABELS[a].localeCompare(CATEGORY_LABELS[b], "es", {
        sensitivity: "base",
      }),
    );
    params.set("categories", sortedCategories.join(","));
  }

  if (risk !== "all") {
    params.set("risk", risk);
  }

  if (sort !== SORT_DEFAULT) {
    params.set("sort", sort);
  }

  return params.toString();
}

function sortInvestments(list: Investment[], order: SortOrder): Investment[] {
  const sorted = [...list].sort((a, b) =>
    a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
  );
  return order === "name-desc" ? sorted.reverse() : sorted;
}

function filterInvestments(
  investments: Investment[],
  categories: InvestmentCategory[],
  risk: InvestmentRisk | "all",
): Investment[] {
  return investments.filter((investment) => {
    const matchesCategory =
      categories.length === 0 || categories.includes(investment.category);
    const matchesRisk = risk === "all" || investment.risk === risk;
    return matchesCategory && matchesRisk;
  });
}

interface InvestmentsViewProps {
  investments: Investment[];
  initialSearchParams?: SearchParams;
}

export function InvestmentsView({
  investments,
  initialSearchParams = {},
}: InvestmentsViewProps) {
  const router = useRouter();
  const pathname = usePathname();

  const availableCategorySet = useMemo(
    () => new Set(investments.map((investment) => investment.category)),
    [investments],
  );

  const categoryOptions = useMemo(
    () =>
      Array.from(availableCategorySet)
        .sort((a, b) =>
          CATEGORY_LABELS[a].localeCompare(CATEGORY_LABELS[b], "es", {
            sensitivity: "base",
          }),
        )
        .map((value) => ({
          value,
          label: CATEGORY_LABELS[value],
        })),
    [availableCategorySet],
  );

  const [selectedCategories, setSelectedCategories] = useState<InvestmentCategory[]>(() =>
    parseCategories(initialSearchParams.categories, availableCategorySet),
  );
  const [selectedRisk, setSelectedRisk] = useState<InvestmentRisk | "all">(() =>
    parseRisk(initialSearchParams.risk),
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(() =>
    parseSort(initialSearchParams.sort),
  );

  const queryRef = useRef<string>(
    buildQueryString(selectedCategories, selectedRisk, sortOrder),
  );

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const nextQuery = buildQueryString(selectedCategories, selectedRisk, sortOrder);
    if (queryRef.current === nextQuery) {
      return;
    }
    queryRef.current = nextQuery;
    const url = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(url, { scroll: false });
  }, [pathname, router, selectedCategories, selectedRisk, sortOrder]);

  const filteredInvestments = useMemo(() => {
    const filtered = filterInvestments(
      investments,
      selectedCategories,
      selectedRisk,
    );
    return sortInvestments(filtered, sortOrder);
  }, [investments, selectedCategories, selectedRisk, sortOrder]);

  const handleCategoryToggle = (category: InvestmentCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="space-y-8">
      <InvestmentFilters
        categories={categoryOptions}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        selectedRisk={selectedRisk}
        onRiskChange={setSelectedRisk}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <InvestmentGrid investments={filteredInvestments} />
    </div>
  );
}
