import type { AnchorHTMLAttributes } from "react";

const baseClasses =
  "btn-gold inline-flex items-center justify-center rounded-full border border-primary-gold/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-black shadow-golden-glow transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-solana-sheen focus-visible:outline-none focus-visible:ring-0";

type UTMParamKey = `utm_${"source" | "medium" | "campaign" | "term" | "content"}`;

type UTMParams = Partial<Record<UTMParamKey, string>>;

export interface AffiliateButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  label: string;
  utm?: UTMParams;
  external?: boolean;
}

function buildHrefWithUtm(baseHref: string, utm?: UTMParams): string {
  if (!utm || Object.keys(utm).length === 0) {
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

export function AffiliateButton({
  href,
  label,
  utm,
  external = false,
  className,
  ...restProps
}: AffiliateButtonProps) {
  const { ["aria-label"]: ariaLabel, ...props } = restProps;
  const finalHref = buildHrefWithUtm(href, utm);
  const rel = external
    ? "nofollow sponsored noopener noreferrer"
    : "nofollow sponsored";

  return (
    <a
      {...props}
      href={finalHref}
      rel={rel}
      target={external ? "_blank" : undefined}
      aria-label={(ariaLabel as string | undefined) ?? label}
      className={`${baseClasses}${className ? ` ${className}` : ""}`}
    >
      <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">{label}</span>
    </a>
  );
}
