import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div
      className={`space-y-6 text-base text-neutral-200 [&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:leading-tight [&>h1]:text-white [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-white [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-neutral-100 [&>p]:leading-relaxed [&>p]:text-neutral-200 [&>ul]:ml-6 [&>ul]:list-disc [&>ul]:space-y-2 [&>ol]:ml-6 [&>ol]:list-decimal [&>ol]:space-y-2${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
