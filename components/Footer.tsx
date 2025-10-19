import Link from "next/link";

const legalLinks = [
  { href: "/legal/aviso", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/afiliados", label: "Afiliados" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-gold/20 bg-primary-black/70 text-neutral-300">
      <div className="container mx-auto flex flex-col gap-6 px-4 py-10 text-sm md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-gold">Wolfsfera</p>
          <p>&copy; {currentYear} Wolfsfera. Todos los derechos reservados.</p>
          <p className="max-w-lg text-xs text-neutral-400">
            Como afiliados podemos obtener ingresos por compras cualificadas.
          </p>
        </div>
        <nav aria-label="Enlaces legales">
          <ul className="flex flex-col gap-2 text-sm md:items-end">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="rounded-md px-2 py-1 text-neutral-200 transition hover:text-primary-gold focus-visible:outline-none"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
