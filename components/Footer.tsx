import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950/90">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between md:px-8">
        <p>&copy; {new Date().getFullYear()} Wolfsfera. Todos los derechos reservados.</p>
        <nav>
          <ul className="flex flex-wrap gap-3">
            <li>
              <Link className="hover:text-teal-300" href="/legal/aviso">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link className="hover:text-teal-300" href="/legal/privacidad">
                Privacidad
              </Link>
            </li>
            <li>
              <Link className="hover:text-teal-300" href="/legal/afiliados">
                Afiliados
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
