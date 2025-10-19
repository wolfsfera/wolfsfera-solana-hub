import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-primary-gold/35 bg-primary-dark/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-200 ease-out hover:shadow-solana-sheen${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
