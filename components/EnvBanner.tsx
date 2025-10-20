"use client";

import { useMemo } from "react";

interface EnvBannerProps {
  deploymentEnv?: string;
  siteUrl?: string;
  productionDomain?: string;
}

function normalize(url?: string): string | undefined {
  return url?.replace(/\/$/, "");
}

export function EnvBanner({
  deploymentEnv,
  siteUrl,
  productionDomain,
}: EnvBannerProps) {
  const shouldDisplay = useMemo(() => {
    const normalizedSite = normalize(siteUrl);
    const normalizedProd = normalize(productionDomain);
    const isPreview = deploymentEnv === "preview" || deploymentEnv === "development";
    const matchesProduction =
      normalizedSite && normalizedProd ? normalizedSite === normalizedProd : false;

    return isPreview || !matchesProduction;
  }, [deploymentEnv, siteUrl, productionDomain]);

  if (!shouldDisplay) {
    return null;
  }

  return (
    <div className="w-full bg-amber-500/20 px-4 py-2 text-center text-sm font-medium text-amber-200">
      Preview build — noindex
    </div>
  );
}
