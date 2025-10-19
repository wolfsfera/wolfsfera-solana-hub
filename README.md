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

## SEO y Analytics

1. Configura las variables de entorno en `.env.local`:
   - `NEXT_PUBLIC_SITE_URL` debe apuntar a la URL pública sin barra final (ej. `https://wolfsfera.com`).
   - `NEXT_PUBLIC_GA_ID` define el identificador de Google Analytics 4 (formato `G-XXXXXXX`).
2. Sustituye la imagen `public/og.jpg` por una versión optimizada en 1200x630 px que represente la identidad negra/dorada de Wolfsfera.
3. Tras desplegar, verifica los datos estructurados y las etiquetas Open Graph:
   - Usa [Rich Results Test](https://search.google.com/test/rich-results) para validar el JSON-LD.
   - Usa una herramienta de vista previa OG/Twitter (p. ej. https://www.opengraph.xyz/) para confirmar la imagen y los metadatos.
4. Comprueba que `https://tusitio.com/robots.txt` y `https://tusitio.com/sitemap.xml` respondan correctamente y que incluyan las rutas esperadas.
5. El banner de cookies gestiona el Consent Mode v2. Acepta o rechaza en la interfaz para confirmar que sólo se inyecta GA cuando existe consentimiento.
