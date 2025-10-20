import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { Section } from "@/components/Section";

const paragraphs = [
  "Esta política de privacidad explica cómo gestionamos los datos personales que puedan recopilarse a través de Wolfsfera Solana Hub.",
  "Los formularios del sitio sólo solicitan información esencial para responder consultas o enviar comunicaciones solicitadas por la persona interesada.",
  "Conservamos los datos el tiempo imprescindible para proporcionar el servicio solicitado y los eliminamos de forma segura cuando dejan de ser necesarios.",
  "Puedes ejercer los derechos de acceso, rectificación, supresión y portabilidad escribiendo a privacidad@wolfsfera.com e indicando la petición concreta.",
  "Aplicamos controles técnicos y organizativos para proteger la información frente a accesos no autorizados, pérdidas o alteraciones accidentales.",
  "No vendemos datos personales a terceros; únicamente compartimos información con proveedores que cumplen estándares de seguridad equivalentes.",
  "El sitio puede incluir enlaces a herramientas externas que tienen sus propias políticas de privacidad; revísalas antes de proporcionar datos en ellas.",
  "Nos comprometemos a revisar periódicamente esta política para alinearla con la normativa vigente y comunicar cambios relevantes a la comunidad.",
];

export const metadata: Metadata = {
  title: "Política de privacidad | Wolfsfera",
};

export default function PrivacidadPage() {
  return (
    <Section
      headingLevel="h1"
      title="Política de privacidad"
      subtitle="Conoce cómo protegemos los datos personales de la comunidad."
    >
      <Prose>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Prose>
    </Section>
  );
}
