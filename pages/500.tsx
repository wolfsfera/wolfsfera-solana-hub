import type { NextPage } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";

const ServerErrorPage: NextPage = () => {
  return (
    <Section
      headingLevel="h1"
      title="Error interno del servidor"
      subtitle="Algo no salió como esperábamos. Estamos trabajando para solucionarlo."
    >
      <p>
        Puedes regresar al inicio o intentar de nuevo en unos minutos. Agradecemos tu paciencia mientras revisamos el incidente.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full border border-primary-gold bg-primary-dark/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary-gold transition hover:bg-primary-dark/60 focus-visible:outline-none"
      >
        Ir al inicio
      </Link>
    </Section>
  );
};

export default ServerErrorPage;
