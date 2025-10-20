import Link from "next/link";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section
      headingLevel="h1"
      title="Página no encontrada"
      subtitle="No pudimos localizar el recurso solicitado. Quizá fue movido o aún no existe."
    >
      <p>
        Revisa la URL o vuelve al inicio para continuar explorando los recursos y análisis del ecosistema Solana.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full border border-primary-gold bg-primary-dark/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-gold transition hover:bg-primary-dark/60 focus-visible:outline-none"
      >
        Volver al inicio
      </Link>
    </Section>
  );
}
