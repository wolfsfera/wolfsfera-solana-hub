"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoWolf } from "@/components/LogoWolf";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/inversiones", label: "Inversiones" },
  { href: "/pumpfun", label: "Pump.fun" },
  { href: "/glosario", label: "Glosario" },
  { href: "/recursos", label: "Recursos" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="border-b border-primary-gold/20 bg-primary-black/80 text-white backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full bg-primary-dark/60 px-3 py-2 transition hover:shadow-solana-sheen focus-visible:outline-none"
          aria-label="Wolfsfera"
        >
          <LogoWolf className="h-9 w-9" />
          <div className="leading-none">
            <span className="block text-xs uppercase tracking-[0.4em] text-primary-gold">Wolfsfera</span>
            <span className="block text-sm font-semibold tracking-[0.3em] text-neutral-200">Solana Hub</span>
          </div>
        </Link>
        <nav className="hidden md:block" aria-label="Navegación principal">
          <ul className="flex items-center gap-6 text-sm font-medium uppercase tracking-[0.25em] text-neutral-300">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative transition hover:text-white ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    <span className="px-1 py-1">
                      {item.label}
                      {isActive ? (
                        <span className="absolute inset-x-0 -bottom-2 block h-0.5 bg-gradient-to-r from-solana-purple via-primary-gold to-solana-green" />
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-gold/40 bg-primary-dark/70 shadow-golden-glow transition hover:border-primary-gold/70">
            <span className="relative block h-4 w-5">
              <span
                aria-hidden
                className={`absolute left-0 block h-0.5 w-full bg-primary-gold transition ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                aria-hidden
                className={`absolute left-0 block h-0.5 w-full bg-primary-gold transition ${
                  isMenuOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                }`}
              />
              <span
                aria-hidden
                className={`absolute bottom-0 left-0 block h-0.5 w-full bg-primary-gold transition ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </span>
        </button>
      </div>
      <nav
        id="mobile-menu"
        aria-label="Navegación móvil"
        className={`md:hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden border-t border-primary-gold/20 bg-primary-dark/90 transition-all duration-200 ease-out`}
      >
        <ul className="flex flex-col gap-3 px-6 py-4 text-sm font-medium uppercase tracking-[0.3em] text-neutral-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 transition hover:bg-primary-black/70 ${
                    isActive ? "bg-primary-black/60 text-white" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
