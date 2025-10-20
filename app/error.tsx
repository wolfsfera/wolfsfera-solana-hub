"use client";

import { useEffect } from "react";
import { Section } from "@/components/Section";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section
      headingLevel="h1"
      title="Se produjo un error"
      subtitle="Ocurrió un problema al cargar el contenido. Puedes intentarlo de nuevo."
    >
      <p>
        Si el error persiste, avísanos para que el equipo técnico pueda investigarlo y aplicar una corrección.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-full border border-primary-gold bg-primary-dark/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-gold transition hover:bg-primary-dark/60 focus-visible:outline-none"
      >
        Reintentar
      </button>
    </Section>
  );
}
