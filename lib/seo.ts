import type { Metadata } from "next";

export const PRODUCTION_SITE_URL = "https://wolfsfera.com";
const FALLBACK_OG_PLACEHOLDER =
  "https://via.placeholder.com/1200x630.png?text=Wolfsfera";

const PREVIEW_ENVS = new Set(["preview", "development"]);

export function getDeploymentEnv(): string {
  return process.env.VERCEL_ENV ?? "local";
}

export function isPreviewDeployment(): boolean {
  return PREVIEW_ENVS.has(getDeploymentEnv());
}

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "");
}

export function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) {
    return PRODUCTION_SITE_URL;
  }

  return normalizeUrl(envUrl);
}

export function isProductionDomain(siteUrl?: string): boolean {
  if (!siteUrl) {
    return false;
  }

  return normalizeUrl(siteUrl) === normalizeUrl(PRODUCTION_SITE_URL);
}

function getOgImageUrl(siteUrl: string): string {
  if (!siteUrl) {
    return FALLBACK_OG_PLACEHOLDER;
  }

  return `${siteUrl}/og.jpg`;
}

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataOptions): Metadata {
  const siteUrl = resolveSiteUrl();
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}` || undefined;
  const ogImageUrl = getOgImageUrl(siteUrl);
  const preview = isPreviewDeployment();
  const titleSuffix = preview ? " [Preview]" : "";

  return {
    title: `${title}${titleSuffix}`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(siteUrl),
    themeColor: "#0a0a0a",
    robots: preview
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title: `${title}${titleSuffix}`,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: `Wolfsfera${titleSuffix}`,
      locale: "es_ES",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title}${titleSuffix}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Wolfsfera",
      title: `${title}${titleSuffix}`,
      description,
      images: [ogImageUrl],
    },
    other: {
      creator: "@Wolfsfera",
    },
  } satisfies Metadata;
}

export function getStructuredOgImage(siteUrl: string): string {
  return getOgImageUrl(siteUrl);
}
