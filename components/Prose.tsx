import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div
      className={`space-y-4 text-base leading-relaxed text-neutral-200 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-white [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-neutral-100 [&>p]:text-neutral-300${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
