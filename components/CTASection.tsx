import { AffiliateButton } from "@/components/AffiliateButton";
import type { AffiliateButtonProps } from "@/components/AffiliateButton";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  href: string;
  label: string;
  external?: boolean;
  utm?: AffiliateButtonProps["utm"];
}

function buildHeadingId(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `cta-${slug || "section"}`;
}

export function CTASection({ title, subtitle, href, label, external = false, utm }: CTASectionProps) {
  const headingId = buildHeadingId(title);

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-3xl border border-primary-gold/30 bg-gradient-to-br from-primary-gold/15 via-primary-gold/10 to-transparent p-8 shadow-[0_0_25px_rgba(212,175,55,0.15)]"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 id={headingId} className="text-2xl font-semibold text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-sm leading-relaxed text-neutral-200">{subtitle}</p>
          ) : null}
        </div>
        <AffiliateButton
          href={href}
          label={label}
          external={external}
          utm={utm}
          trackingCategory="cta"
        />
      </div>
    </section>
  );
}
