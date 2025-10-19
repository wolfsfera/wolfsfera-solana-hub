import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { resolveSiteUrl, getStructuredOgImage } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wolfsfera Solana Hub",
    template: "%s | Wolfsfera",
  },
  description: "Hub informativo sobre inversiones y ecosistema Solana.",
  themeColor: "#0a0a0a",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Wolfsfera Solana Hub",
    description: "Hub informativo sobre inversiones y ecosistema Solana.",
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Wolfsfera",
    images: [
      {
        url: getStructuredOgImage(siteUrl),
        width: 1200,
        height: 630,
        alt: "Wolfsfera Solana Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Wolfsfera",
    title: "Wolfsfera Solana Hub",
    description: "Hub informativo sobre inversiones y ecosistema Solana.",
    images: [getStructuredOgImage(siteUrl)],
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    creator: "@Wolfsfera",
  },
};

const consentBootstrap = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);} ;
  window.initConsent = function initConsent() {
    const match = document.cookie.match(/(?:^|; )consent=(accepted|declined)/);
    const granted = match ? match[1] === "accepted" : false;
    const status = granted ? "granted" : "denied";
    window.gtag('consent', 'update', {
      ad_storage: status,
      analytics_storage: status,
    });
  };
  window.initConsent();
`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content="Wolfsfera" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${poppins.className} flex min-h-screen flex-col bg-transparent text-neutral-100 antialiased`}
      >
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="space-y-12">{children}</div>
        </main>
        <Footer />
        <SeoJsonLd />
        <CookieBanner />
        <Script id="consent-bootstrap" strategy="beforeInteractive">
          {consentBootstrap}
        </Script>
      </body>
    </html>
  );
}
