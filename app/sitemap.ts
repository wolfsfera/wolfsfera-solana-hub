import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/seo";

const PREVIEW_ENVS = new Set(["preview", "development"]);
const staticRoutes = ["/", "/inversiones", "/pumpfun", "/glosario", "/recursos"];

export default function sitemap(): MetadataRoute.Sitemap {
  const vercelEnv = process.env.VERCEL_ENV ?? "local";
  const isPreview = PREVIEW_ENVS.has(vercelEnv);
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const isRealDomain =
    configuredSiteUrl && !configuredSiteUrl.includes("vercel.app") && !configuredSiteUrl.includes("localhost");

  if (isPreview || !isRealDomain) {
    return [];
  }

  const siteUrl = resolveSiteUrl();
  const now = new Date().toISOString();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.6,
  }));
}
