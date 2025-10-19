"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent as ReactMouseEvent } from "react";
import { ExternalLink, isDomainAllowed } from "@/components/ExternalLink";
import { trackEvent } from "@/lib/analytics";

const baseClasses =
  "btn-gold inline-flex items-center justify-center rounded-full border border-primary-gold/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-black shadow-golden-glow transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-solana-sheen focus-visible:outline-none focus-visible:ring-0";

type UTMParamKey = `utm_${"source" | "medium" | "campaign" | "term" | "content"}`;

type UTMParams = Partial<Record<UTMParamKey, string>>;

export interface AffiliateButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  label: string;
  utm?: UTMParams;
  external?: boolean;
  trackingCategory?: string;
  disabled?: boolean;
  disabledReason?: string;
}

function buildHrefWithUtm(baseHref: string, utm: UTMParams): string {
  if (Object.keys(utm).length === 0) {
    return baseHref;
  }

  const [urlWithoutHash, hash = ""] = baseHref.split("#");
  const [path, queryString = ""] = urlWithoutHash.split("?");
  const params = new URLSearchParams(queryString);

  Object.entries(utm).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  const hashSuffix = hash ? `#${hash}` : "";
  return `${path}${query ? `?${query}` : ""}${hashSuffix}`;
}

function deriveCampaignSlug(pathname: string | null): string {
  if (!pathname || pathname === "/") {
    return "home";
  }

  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  return trimmed.replace(/\//g, "-") || "home";
}

export function AffiliateButton({
  href,
  label,
  utm,
  external = false,
  className,
  trackingCategory,
  disabled = false,
  disabledReason,
  onClick,
  ...restProps
}: AffiliateButtonProps) {
  const pathname = usePathname();

  const defaultUtm = useMemo<UTMParams>(() => {
    const campaign = deriveCampaignSlug(pathname);
    return {
      utm_source: "wolfsfera",
      utm_medium: "affiliate",
      utm_campaign: campaign,
    };
  }, [pathname]);

  const mergedUtm = useMemo(() => {
    const withDefaults = { ...defaultUtm, ...utm } as UTMParams;
    return Object.fromEntries(
      Object.entries(withDefaults).filter(([, value]) => Boolean(value)),
    ) as UTMParams;
  }, [defaultUtm, utm]);

  const finalHref = useMemo(() => buildHrefWithUtm(href, mergedUtm), [href, mergedUtm]);
  const rel = "nofollow sponsored noopener noreferrer";
  const isWhitelisted = isDomainAllowed(finalHref);
  const shouldDisable = disabled || !isWhitelisted;
  const tooltip = shouldDisable
    ? disabledReason ?? (!isWhitelisted ? "Dominio no permitido" : undefined)
    : undefined;
  const ariaLabel = (restProps["aria-label"] as string | undefined) ?? label;
  const combinedClassName = `${baseClasses}${className ? ` ${className}` : ""}${
    shouldDisable ? " cursor-not-allowed opacity-60" : ""
  }`;

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      trackEvent("affiliate_click", {
        label,
        href: finalHref,
        category: trackingCategory ?? "general",
        page: pathname ?? "/",
      });
      onClick?.(event);
    },
    [finalHref, label, onClick, pathname, trackingCategory],
  );

  if (shouldDisable) {
    return (
      <button
        type="button"
        className={combinedClassName}
        disabled
        aria-disabled="true"
        title={tooltip}
      >
        <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">{label}</span>
      </button>
    );
  }

  const { ["aria-label"]: _, ...props } = restProps;

  return (
    <ExternalLink
      {...props}
      href={finalHref}
      rel={rel}
      target={external ? "_blank" : undefined}
      aria-label={ariaLabel}
      className={combinedClassName}
      unstyled
      onClick={handleClick}
    >
      <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">{label}</span>
    </ExternalLink>
  );
}
