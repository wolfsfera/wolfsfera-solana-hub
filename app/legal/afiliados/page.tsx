import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { Section } from "@/components/Section";

const paragraphs = [
  "La política de afiliados de Wolfsfera Solana Hub detalla cómo divulgamos posibles relaciones comerciales con terceros.",
  "Algunos enlaces publicados en guías o boletines pueden ser enlaces de afiliación que generan comisiones sin coste adicional para ti.",
  "Seleccionamos colaboraciones basadas en su utilidad para la comunidad y rechazamos propuestas que entren en conflicto con nuestra ética editorial.",
  "Cuando un contenido incluya enlaces patrocinados lo indicaremos de forma visible para que puedas tomar decisiones informadas.",
  "Los ingresos generados se destinan a cubrir gastos operativos, investigación de mercado y desarrollo de herramientas abiertas.",
  "El hecho de que exista una relación de afiliación no altera nuestras recomendaciones ni garantiza la cobertura de un proyecto específico.",
  "Si detectas un enlace roto o una oferta caducada puedes comunicarlo a partners@wolfsfera.com para que revisemos la incidencia.",
  "Esta política puede actualizarse conforme evolucionen los canales de monetización; revisa la fecha de publicación para conocer la versión vigente.",
];

export const metadata: Metadata = {
  title: "Política de afiliados | Wolfsfera",
};

export default function AfiliadosPage() {
  return (
    <Section
      headingLevel="h1"
      title="Política de afiliados"
      subtitle="Transparencia sobre colaboraciones y enlaces monetizados del ecosistema."
    >
      <Prose>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Prose>
    </Section>
  );
}
