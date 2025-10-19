# Wolfsfera Solana Hub

Scaffolding inicial del hub de recursos de Wolfsfera para el ecosistema Solana. Incluye Next.js 14 con App Router,
TypeScript y TailwindCSS configurados.

## Requisitos

- Node.js 18 o superior
- npm 10 o superior

## Puesta en marcha

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Comandos básicos

```bash
npm i
npm run dev
npm run build
```

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera la build de producción.
- `npm run start`: Ejecuta la build de producción.
- `npm run lint`: Ejecuta las reglas de ESLint.

## Estilo Wolfsfera

La interfaz utiliza la paleta negro/dorado metálico con acentos Solana:

- `primary.black` `#0a0a0a` y `primary.dark` `#1a1a1a` para fondos.
- `primary.gold` `#d4af37` para detalles metálicos.
- `solana.purple` `#9945FF` y `solana.green` `#14F195` como brillos complementarios.

La tipografía base es **Poppins** (con fallback `system-ui`). Puedes aplicar el estilo global a tus componentes usando las clases utilitarias de Tailwind y los helpers definidos en `app/globals.css` (`.gold-gradient`, `.solana-sheen`, `.btn-gold`).

### Componentes destacados

`AffiliateButton` genera enlaces con estilo dorado y puede añadir parámetros UTM automáticamente:

```tsx
import { AffiliateButton } from "@/components/AffiliateButton";

<AffiliateButton
  href="https://pump.fun"
  label="Ir a Pump.fun"
  external
  utm={{ utm_source: "wolfsfera", utm_medium: "cta", utm_campaign: "pumpfun" }}
/>
```

`ExternalLink` valida dominios frente a `data/whitelist.json` y solo abre nuevas pestañas cuando el destino está permitido:

```tsx
import { ExternalLink } from "@/components/ExternalLink";

<ExternalLink href="https://docs.solana.com/intro/learn">
  Documentación oficial de Solana
</ExternalLink>
```

Ambos componentes respetan accesibilidad y estilos de foco dorado para integrarse con el branding de Wolfsfera.
