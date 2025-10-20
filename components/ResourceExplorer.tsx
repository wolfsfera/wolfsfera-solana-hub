"use client";

import { useMemo, useState } from "react";
import { Grid } from "@/components/Grid";
import { ResourceCard, type Resource } from "@/components/ResourceCard";

interface ResourceExplorerProps {
  resources: Resource[];
}

const ALL_OPTION = "todas";

export function ResourceExplorer({ resources }: ResourceExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_OPTION);

  const categories = useMemo(() => {
    const unique = new Set(resources.map((resource) => resource.category));
    return [ALL_OPTION, ...Array.from(unique)];
  }, [resources]);

  const filteredResources = useMemo(() => {
    if (selectedCategory === ALL_OPTION) {
      return resources;
    }

    return resources.filter((resource) => resource.category === selectedCategory);
  }, [resources, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-neutral-300" htmlFor="resource-category-filter">
          Filtrar por categoría
        </label>
        <select
          id="resource-category-filter"
          className="w-full rounded-full border border-primary-gold/40 bg-primary-dark/80 px-4 py-2 text-sm text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold/60 sm:w-auto"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === ALL_OPTION ? "Todas" : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <Grid>
        {filteredResources.map(({ id, ...cardProps }) => (
          <ResourceCard key={id} {...cardProps} />
        ))}
      </Grid>
    </div>
  );
}
