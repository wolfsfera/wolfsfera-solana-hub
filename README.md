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

## Páginas estáticas y rutas de error

Las siguientes rutas están disponibles con contenido placeholder mientras definimos la versión definitiva:

- `/glosario`
- `/recursos`
- `/legal/aviso`
- `/legal/privacidad`
- `/legal/afiliados`
- `/404`
- `/500`

Los textos se actualizarán en futuras iteraciones para reflejar la redacción legal aprobada y los recursos finales.

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

## Inversiones — filtros y tracking

- Edita `data/investments.json` para añadir, actualizar o eliminar proyectos. Respeta las claves existentes (`id`, `name`, `category`, `risk`, `summary`, `url`, `whitelistDomain`).
- Si un dominio no está permitido, añade su hostname (sin `https://`) en `data/whitelist.json` dentro del array `allowedDomains`.
- Los clics en CTAs afiliados respetan el consentimiento de cookies y registran métricas básicas en `localStorage['wf_events']`. Cada clave corresponde al nombre del evento (p. ej. `affiliate_click`).
- Antes de publicar nuevos partners revisa la nota legal: Wolfsfera es un medio informativo, los enlaces pueden contener afiliación y existen riesgos inherentes al invertir.

## Recursos y CTA

- Añade o edita recursos desde `data/resources.json`. Cada entrada incluye `id`, `name`, `category` (`"guías" | "wallet" | "exchange" | "herramienta" | "educación"`), `summary`, `url`, `whitelistDomain` y `tags` opcionales.
- Usa `tags` con el valor `"afiliado"` para que `ResourceCard` muestre el CTA como botón de afiliado con UTM automáticas. Otros tags se renderizan como badges.
- Renderiza el grid con `<ResourceExplorer resources={resources} />` y el layout de cards con `<ResourceCard {...item} />`. `ResourceCard` valida el dominio indicado en `whitelistDomain` y desactiva el CTA cuando no está permitido.
- Mantén actualizada la lista de dominios permitidos en `data/whitelist.json` antes de publicar nuevos recursos o CTA externos.
- El bloque `<CTASection>` encapsula CTAs destacados con fondo dorado, botón afiliado y `aria-labelledby`. Puedes sobreescribir los parámetros UTM mediante la prop `utm`.
- Toda comunicación de afiliados debe acompañarse del aviso legal correspondiente en las páginas donde se utilicen estos componentes.

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

## Dashboard en vivo

El panel `/dashboard` agrega tres bloques actualizados cada minuto:

- **Resumen SOL**: precio spot, variación 24h, market cap (cuando Coingecko lo publica) y hora de la última actualización.
- **Tokens destacados**: tabla con 7 activos del ecosistema Solana, incluyendo sparkline de 7 días y enlaces externos validados.
- **Pump.fun trending**: listado de memes en tendencia con CTA afiliado hacia Pump.fun.

### Fuentes de datos

- [Coingecko API pública](https://www.coingecko.com/) para precio, variación 24h, market cap y series de 7 días.
- Mock seguro en caso de que Coingecko o Pump.fun no respondan; se muestra un badge “Datos en caché”.

### Personalización

- Edita `getTokensBrief()` en `lib/data/solana.ts` para añadir o quitar IDs soportados por Coingecko.
- Ajusta la política de caché cambiando `revalidate: 60` en las funciones de datos o en las rutas de la API.

### Nota legal

Los datos de mercado se ofrecen sin garantía y **no constituyen consejo financiero**. Usa la información bajo tu propio criterio.

## Deploy en Vercel

1. Importa este repositorio en Vercel y selecciona el framework **Next.js** (detección automática).
2. Configura las variables de entorno en el proyecto:
   - `NEXT_PUBLIC_SITE_URL` → dominio público definitivo en producción.
   - `NEXT_PUBLIC_GA_ID` → identificador GA4 (opcional, solo si usas Analytics).
3. En la sección **Domains** añade `wolfsfera.com` u otro dominio propio y apunta los DNS.
4. Lanza un redeploy para aplicar la configuración.
5. Verifica tras el despliegue:
   - `https://tu-dominio.com/api/health` devuelve `{ ok: true }` con `env` y `time`.
   - `/robots.txt` responde `noindex, nofollow` en previews y permite indexación en producción.
   - Valida las etiquetas OG/Twitter en [metatags.io](https://metatags.io/).
   - El banner de consentimiento aparece y Google Analytics solo se activa tras aceptar.
6. Comprueba las cabeceras de seguridad ejecutando `curl -I https://tu-dominio.com` o desde DevTools → Network.

Las previsualizaciones (`VERCEL_ENV=preview`) muestran un banner “Preview build — noindex”, devuelven `robots.txt` con `noindex` y no generan sitemap. Ajusta `NEXT_PUBLIC_SITE_URL` en cada entorno para mantener metadatos y canónicos correctos.
