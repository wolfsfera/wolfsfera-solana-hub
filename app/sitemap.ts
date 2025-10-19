import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/seo";

const staticRoutes = ["/", "/inversiones", "/pumpfun", "/glosario", "/recursos"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();
  const now = new Date().toISOString();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.6,
  }));
}
