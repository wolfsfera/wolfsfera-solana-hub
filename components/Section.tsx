import type { ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3";

export interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  className?: string;
  headingLevel?: HeadingLevel;
}

export function Section({
  title,
  subtitle,
  children,
  id,
  className = "",
  headingLevel = "h2",
}: SectionProps) {
  const HeadingTag = headingLevel as keyof JSX.IntrinsicElements;

  const headingClassName =
    "text-3xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(20,241,149,0.15)]";

  return (
    <section id={id} className={`space-y-8 py-8${className ? ` ${className}` : ""}`}>
      <header className="space-y-2">
        <HeadingTag className={headingClassName}>{title}</HeadingTag>
        {subtitle ? (
          <p className="max-w-3xl text-base text-neutral-300">{subtitle}</p>
        ) : null}
      </header>
      <div className="space-y-6 text-neutral-200">{children}</div>
    </section>
  );
}
