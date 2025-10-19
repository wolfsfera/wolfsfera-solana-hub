"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

interface GlossaryEntry {
  term: string;
  description: string;
}

const glossaryEntries: GlossaryEntry[] = [
  {
    term: "Blockchain",
    description:
      "Base de datos distribuida que registra transacciones de forma inmutable y transparente en una red descentralizada.",
  },
  {
    term: "Airdrop",
    description:
      "Distribución gratuita de tokens a usuarios, normalmente como incentivo de participación o fidelidad.",
  },
  {
    term: "Wallet",
    description: "Aplicación o dispositivo que gestiona tus claves privadas y permite interactuar con redes cripto.",
  },
  {
    term: "Seed phrase",
    description:
      "Lista de palabras que actúa como respaldo maestro de tu billetera. Debe mantenerse en secreto y offline.",
  },
  {
    term: "DEX",
    description:
      "Exchange descentralizado donde los usuarios negocian tokens directamente desde sus billeteras.",
  },
  {
    term: "Stake",
    description:
      "Proceso de bloquear tokens para respaldar la red y recibir recompensas por la participación.",
  },
  {
    term: "Liquidity pool",
    description:
      "Fondo de tokens aportados por usuarios que permite ejecutar intercambios automáticos en un DEX.",
  },
  {
    term: "Slippage",
    description:
      "Diferencia entre el precio esperado y el precio ejecutado de una operación debido a la liquidez disponible.",
  },
  {
    term: "Mint",
    description: "Creación de nuevos tokens o NFTs directamente en la blockchain.",
  },
  {
    term: "RPC",
    description: "Nodo que expone una interfaz para leer y enviar transacciones a la blockchain.",
  },
];

export function GlossaryContent() {
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const termQuery = query.trim().toLowerCase();
    if (!termQuery) {
      return glossaryEntries;
    }

    return glossaryEntries.filter((entry) =>
      `${entry.term} ${entry.description}`.toLowerCase().includes(termQuery),
    );
  }, [query]);

  return (
    <div className="space-y-10">
      <Section
        title="Glosario Wolfsfera"
        subtitle="Define tus conceptos clave de Solana y mantén la visión nítida. Usa el buscador para filtrar términos al instante."
      >
        <div className="space-y-3">
          <label className="block text-sm font-medium text-primary-gold" htmlFor="glossary-search">
            Buscar términos
          </label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Escribe por ejemplo: stake, wallet, slippage..."
            className="w-full rounded-full border border-primary-gold/30 bg-primary-black/70 px-4 py-3 text-sm text-white shadow-inner focus-visible:outline-none"
            aria-describedby="glossary-results"
            aria-label="Buscar en el glosario"
          />
          <p id="glossary-results" aria-live="polite" className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            {filteredEntries.length} resultado{filteredEntries.length === 1 ? "" : "s"}
          </p>
        </div>
      </Section>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.term}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="h-full"
              layout
            >
              <Card className="h-full space-y-3">
                <h3 className="text-lg font-semibold text-primary-gold">{entry.term}</h3>
                <p className="text-sm text-neutral-200">{entry.description}</p>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredEntries.length === 0 ? (
        <p className="rounded-2xl border border-primary-gold/20 bg-primary-dark/70 p-6 text-sm text-neutral-300" role="status">
          No encontramos coincidencias. Ajusta tu búsqueda e inténtalo de nuevo.
        </p>
      ) : null}
    </div>
  );
}
