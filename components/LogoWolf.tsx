export interface LogoWolfProps {
  className?: string;
  title?: string;
}

export function LogoWolf({ className = "", title = "Logotipo temporal de Wolfsfera" }: LogoWolfProps) {
  return (
    <svg
      className={className}
      role="img"
      viewBox="0 0 64 64"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="wolfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#9945FF" />
          <stop offset="100%" stopColor="#14F195" />
        </linearGradient>
      </defs>
      <path
        d="M8 38c6-2 10-10 12-16 3 6 8 12 14 12 6 0 11-7 14-13 2 6 6 15 12 17-7 3-13 10-14 18-4-3-7-5-12-5s-8 2-12 5c-1-8-7-15-14-18z"
        fill="url(#wolfGradient)"
      />
      <path
        d="M24 24c1.5-2 4-4 8-4s6.5 2 8 4c-1.5 1-4 3-8 3s-6.5-2-8-3z"
        fill="#0a0a0a"
        opacity="0.8"
      />
    </svg>
  );
}
