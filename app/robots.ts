import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/seo";

const PREVIEW_ENVS = new Set(["preview", "development"]);

export default function robots(): MetadataRoute.Robots {
  const vercelEnv = process.env.VERCEL_ENV ?? "local";
  const isPreview = PREVIEW_ENVS.has(vercelEnv);
  const siteUrl = resolveSiteUrl();
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const isRealDomain =
    configuredSiteUrl && !configuredSiteUrl.includes("vercel.app") && !configuredSiteUrl.includes("localhost");

  if (isPreview) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: ["/", "/api/*"],
        },
      ],
      sitemap: [],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
    sitemap: isRealDomain ? [`${siteUrl}/sitemap.xml`] : [],
  };
}
