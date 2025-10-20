import { Card } from "@/components/Card";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ExternalLink, extractDomain, isDomainAllowed } from "@/components/ExternalLink";

const CATEGORY_LABELS = {
  "guías": "Guías",
  wallet: "Wallet",
  exchange: "Exchange",
  herramienta: "Herramienta",
  educación: "Educación",
} as const;

type ResourceCategory = keyof typeof CATEGORY_LABELS;

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  summary: string;
  url: string;
  whitelistDomain: string;
  tags?: string[];
}

export type ResourceCardProps = Omit<Resource, "id">;

const tagClassName =
  "inline-flex items-center rounded-full border border-primary-gold/40 bg-primary-dark/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary-gold";

const linkClassName =
  "inline-flex items-center justify-center rounded-full border border-primary-gold/50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-gold transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-gold/80 hover:text-white";

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isAffiliate(tags?: string[]): boolean {
  return Boolean(tags?.some((tag) => tag.toLowerCase() === "afiliado"));
}

export function ResourceCard({
  name,
  summary,
  category,
  url,
  whitelistDomain,
  tags = [],
}: ResourceCardProps) {
  const readableCategory = CATEGORY_LABELS[category];
  const affiliate = isAffiliate(tags);
  const allowed = isDomainAllowed(whitelistDomain);
  const domain = extractDomain(url) ?? whitelistDomain;
  const slug = toSlug(name);

  return (
    <Card className="flex h-full flex-col justify-between gap-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-white" id={`resource-${slug}`}>
            {name}
          </h3>
          <span className="inline-flex items-center rounded-full border border-primary-gold/30 bg-primary-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-gold">
            {readableCategory}
          </span>
        </header>
        <p className="text-sm leading-relaxed text-neutral-200">{summary}</p>
        {tags.length ? (
          <ul className="flex flex-wrap gap-2" aria-label="Etiquetas del recurso">
            {tags.map((tag) => (
              <li key={tag}>
                <span className={tagClassName}>{tag}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <footer className="flex flex-col gap-4" aria-labelledby={`resource-${slug}`}>
        <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">{domain}</span>
        <div className="flex justify-end">
          {affiliate ? (
            <AffiliateButton
              href={url}
              label="Visitar"
              external
              trackingCategory="recursos"
              disabled={!allowed}
              disabledReason={!allowed ? "Dominio no permitido" : undefined}
            />
          ) : allowed ? (
            <ExternalLink
              href={url}
              className={linkClassName}
              unstyled
              rel="nofollow noopener noreferrer"
            >
              Visitar
            </ExternalLink>
          ) : (
            <button
              type="button"
              className={`${linkClassName} cursor-not-allowed opacity-50`}
              disabled
              aria-disabled="true"
              title="Dominio no permitido"
            >
              Visitar
            </button>
          )}
        </div>
      </footer>
    </Card>
  );
}
