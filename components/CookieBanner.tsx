"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Script from "next/script";

const CONSENT_COOKIE_NAME = "consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 año

type ConsentChoice = "accepted" | "declined";
type ConsentState = ConsentChoice | "unknown";

function readConsentCookie(): ConsentChoice | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=(accepted|declined)`),
  );
  if (!match) {
    return null;
  }

  return match[1] as ConsentChoice;
}

function persistConsent(value: ConsentChoice) {
  const secureFlag = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secureFlag}`;
}

export function CookieBanner() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState<ConsentState>("unknown");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const current = readConsentCookie();
    if (current) {
      setConsent(current);
    }
    setIsHydrated(true);
  }, []);

  const updateConsent = useCallback((value: ConsentChoice) => {
    persistConsent(value);
    setConsent(value);
  }, []);

  const shouldDisplayBanner = useMemo(
    () => isHydrated && consent === "unknown",
    [consent, isHydrated],
  );

  useEffect(() => {
    if (consent === "accepted" || consent === "declined") {
      window.initConsent?.();
    }
  }, [consent]);

  return (
    <>
      {gaId && consent === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);} ;
              window.gtag('js', new Date());
              window.gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
      {shouldDisplayBanner ? (
        <aside
          role="dialog"
          aria-live="polite"
          aria-label="Preferencias de cookies"
          className="pointer-events-auto fixed bottom-4 right-4 max-w-md rounded-2xl border border-primary-gold/25 bg-primary-dark/90 p-5 text-sm text-neutral-100 shadow-golden-glow backdrop-blur"
        >
          <p className="text-neutral-200">
            Utilizamos cookies para medir el rendimiento y mejorar la experiencia. ¿Nos permites activar la analítica?
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => updateConsent("declined")}
              className="flex-1 min-w-[120px] rounded-full border border-primary-gold/40 bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-300 transition hover:border-primary-gold/60 hover:text-white"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => updateConsent("accepted")}
              className="flex-1 min-w-[120px] rounded-full bg-primary-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-black shadow-golden-glow transition hover:-translate-y-0.5"
            >
              Aceptar
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
