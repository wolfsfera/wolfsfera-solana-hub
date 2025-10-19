import type { Metadata } from "next";
import { GlossaryContent } from "./GlossaryContent";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Glosario Solana — Conceptos clave Wolfsfera",
    description:
      "Consulta términos esenciales del ecosistema Solana con definiciones claras para fortalecer tu estrategia cripto.",
    path: "/glosario",
  });
}

export default function GlosarioPage() {
  return <GlossaryContent />;
}
