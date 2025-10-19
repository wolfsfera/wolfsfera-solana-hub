import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/inversiones", label: "Inversiones" },
  { href: "/pumpfun", label: "Pump.fun" },
  { href: "/glosario", label: "Glosario" },
  { href: "/recursos", label: "Recursos" },
  { href: "/legal/aviso", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/afiliados", label: "Afiliados" },
];

export function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 md:px-8">
        <Link href="/" className="text-lg font-semibold uppercase tracking-wide">
          Wolfsfera Solana Hub
        </Link>
        <nav>
          <ul className="flex flex-wrap gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
