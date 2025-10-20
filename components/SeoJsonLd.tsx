"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { resolveSiteUrl } from "@/lib/seo";

function toTitle(text: string): string {
  return text
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildBreadcrumb(pathname: string, siteUrl: string) {
  if (!pathname) {
    return null;
  }

  const matchablePrefixes = ["/legal", "/inversiones"];
  const hasMatch = matchablePrefixes.some((prefix) => pathname.startsWith(prefix));
  if (!hasMatch) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return null;
  }

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: siteUrl,
    },
  ];

  segments.forEach((segment, index) => {
    const url = `${siteUrl}/${segments.slice(0, index + 1).join("/")}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: toTitle(segment),
      item: url,
    });
  });

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  } as const;
}

export function SeoJsonLd() {
  const pathname = usePathname() ?? "/";
  const siteUrl = resolveSiteUrl();

  const jsonLd = useMemo(() => {
    const baseGraph: Array<Record<string, unknown>> = [
      {
        "@type": "Organization",
        name: "Wolfsfera",
        url: siteUrl,
        logo: `${siteUrl}/og.jpg`,
      },
      {
        "@type": "WebSite",
        url: siteUrl,
        name: "Wolfsfera",
        inLanguage: "es",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ];

    const breadcrumb = buildBreadcrumb(pathname, siteUrl);
    if (breadcrumb) {
      baseGraph.push(breadcrumb);
    }

    return {
      "@context": "https://schema.org",
      "@graph": baseGraph,
    };
  }, [pathname, siteUrl]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
