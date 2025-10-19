const CONSENT_COOKIE_NAME = "consent";
const STORAGE_KEY = "wf_events";

function readConsentCookie(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=(accepted|declined)`),
  );

  if (!match) {
    return null;
  }

  return match[1];
}

export function hasConsent(): boolean {
  return readConsentCookie() === "accepted";
}

function incrementLocalCounter(name: string) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    const currentValue = window.localStorage.getItem(STORAGE_KEY);
    const parsed: Record<string, number> = currentValue
      ? JSON.parse(currentValue)
      : {};
    const nextCount = (parsed[name] ?? 0) + 1;
    const nextState = { ...parsed, [name]: nextCount };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch (error) {
    // En entornos con políticas estrictas de almacenamiento, ignoramos errores.
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  incrementLocalCounter(name);

  if (typeof window === "undefined") {
    return;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!hasConsent() || !gaId) {
    return;
  }

  const gtag = window.gtag as
    | ((command: string, action: string, options?: Record<string, unknown>) => void)
    | undefined;

  if (typeof gtag === "function") {
    gtag("event", name, params ?? {});
  }
}

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "consent" | string,
      action: string,
      options?: Record<string, unknown>,
    ) => void;
  }
}
