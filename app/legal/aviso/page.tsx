import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { Section } from "@/components/Section";

const paragraphs = [
  "Este aviso legal describe la titularidad del sitio Wolfsfera Solana Hub y las responsabilidades derivadas de su uso.",
  "El acceso a la plataforma es gratuito; sin embargo, la disponibilidad del servicio puede variar según mantenimientos programados o incidencias técnicas.",
  "Las opiniones expresadas en nuestros artículos y recursos se publican con fines informativos y no constituyen asesoramiento financiero, legal ni fiscal.",
  "Queda prohibida la reproducción total o parcial del contenido sin autorización previa por escrito del equipo de Wolfsfera.",
  "Los enlaces a plataformas externas se facilitan para ampliar información y no implican afiliación directa ni responsabilidad sobre su funcionamiento.",
  "Al participar en comunidades o formularios asociados aceptas mantener un tono respetuoso y abstenerte de compartir información confidencial.",
  "Nos reservamos el derecho de actualizar este aviso legal para reflejar cambios regulatorios o internos, indicando siempre la fecha de la última revisión.",
  "Si detectas errores, usos indebidos o vulnerabilidades, puedes escribirnos a contacto@wolfsfera.com para que el equipo revise el caso de inmediato.",
];

export const metadata: Metadata = {
  title: "Aviso legal | Wolfsfera",
};

export default function AvisoLegalPage() {
  return (
    <Section
      headingLevel="h1"
      title="Aviso legal"
      subtitle="Consulta las condiciones generales de uso y los límites de responsabilidad del portal."
    >
      <Prose>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Prose>
    </Section>
  );
}
