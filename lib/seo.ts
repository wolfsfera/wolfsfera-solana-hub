import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://wolfsfera.com";
const FALLBACK_OG_PLACEHOLDER =
  "https://via.placeholder.com/1200x630.png?text=Wolfsfera";

export function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) {
    return FALLBACK_SITE_URL;
  }

  return envUrl.replace(/\/$/, "");
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

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    metadataBase: new URL(siteUrl),
    themeColor: "#0a0a0a",
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Wolfsfera",
      locale: "es_ES",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Wolfsfera",
      title,
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
