import type { AnchorHTMLAttributes, ReactNode } from "react";
import whitelist from "@/data/whitelist.json";

const allowedDomains = new Set(whitelist.allowedDomains.map((domain) => domain.toLowerCase()));

export interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  className?: string;
}

function getDomain(href: string): string | null {
  try {
    const url = new URL(href);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch (error) {
    return null;
  }
}

const baseClasses =
  "underline underline-offset-4 transition focus-visible:outline-none focus-visible:ring-0";

export function ExternalLink({ href, children, className = "", ...props }: ExternalLinkProps) {
  const domain = getDomain(href);

  if (domain && !allowedDomains.has(domain)) {
    return (
      <span role="alert" className="text-sm font-medium text-red-400">
        Dominio no permitido
      </span>
    );
  }

  if (!domain) {
    return (
      <a
        {...props}
        href={href}
        className={`${baseClasses} text-sky-300 hover:text-solana-green${className ? ` ${className}` : ""}`}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} text-solana-green hover:text-solana-purple${className ? ` ${className}` : ""}`}
    >
      {children}
    </a>
  );
}
