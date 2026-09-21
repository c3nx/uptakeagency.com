// Tarayici tarafi GA4 yukleyici. Astro'nun bundle ettigi <script> icinden import edilir,
// 'self' kaynagindan servis edilir (CSP uyumlu). Onay verilmeden Google'a istek gitmez.

import { GA_MEASUREMENT_ID } from "../config/analytics";
import {
  CONSENT_STORAGE_KEY,
  gaCookieNamesToClear,
  parseStoredConsent,
  toConsentModeState,
  type ConsentChoice,
} from "./consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type GtagFn = (...args: unknown[]) => void;

let defaultsPushed = false;
let gtagLoaded = false;

const gtag: GtagFn = function () {
  window.dataLayer = window.dataLayer ?? [];
  // gtag.js dataLayer'da arguments nesnesi bekler
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
};

/** Consent Mode v2 varsayilani: dort anahtar da denied. gtag yuklenmeden once basilir. */
function pushConsentDefaults(): void {
  if (defaultsPushed) return;
  defaultsPushed = true;
  gtag("consent", "default", toConsentModeState(null));
}

/** Kayitli tercih. localStorage erisilemezse onay yok sayilir. */
export function readStoredConsent(): ConsentChoice | null {
  try {
    return parseStoredConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Depolama kapali: tercih kalici olmaz, oturum icinde gecerli kalir
  }
}

/** GA cerezlerini domain ve path varyantlariyla siler. */
export function clearGaCookies(): void {
  const names = gaCookieNamesToClear(document.cookie);
  if (names.length === 0) return;

  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = new Set<string>(["", host, `.${host}`]);
  // sub.example.com -> .example.com gibi ust alan adi varyantlari
  for (let i = 1; i < parts.length - 1; i += 1) {
    domains.add(`.${parts.slice(i).join(".")}`);
  }

  const paths = new Set<string>(["/", window.location.pathname]);

  for (const name of names) {
    for (const domain of domains) {
      for (const path of paths) {
        const domainPart = domain ? `; domain=${domain}` : "";
        document.cookie = `${name}=; Max-Age=0; path=${path}${domainPart}`;
      }
    }
  }
}

/** Onay verildi: consent update -> js -> config, ardindan gtag.js dinamik olarak eklenir. */
export function enableAnalytics(): void {
  pushConsentDefaults();
  gtag("consent", "update", toConsentModeState("granted"));
  if (gtagLoaded) return;
  gtagLoaded = true;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

/** Onay geri alindi: consent update denied + GA cerezlerini temizle. */
export function disableAnalytics(): void {
  pushConsentDefaults();
  gtag("consent", "update", toConsentModeState("denied"));
  clearGaCookies();
}

/** Sayfa acilisinda kayitli tercihi uygular. Tercih yoksa hicbir sey yuklenmez. */
export function applyStoredConsent(): ConsentChoice | null {
  const choice = readStoredConsent();
  if (choice === "granted") enableAnalytics();
  return choice;
}

/** Olay gonderimi: onay yoksa ya da gtag yuklenmediyse sessiz no-op, asla hata firlatmaz. */
export function trackEvent(name: string, params: Record<string, string> = {}): void {
  try {
    if (!gtagLoaded) return;
    gtag("event", name, params);
  } catch {
    // Olcum hicbir zaman sayfayi kirmaz
  }
}

/** mailto baglantilari icin document seviyesinde delegated dinleyici. */
export function initMailtoTracking(): void {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>('a[href^="mailto:"]');
    if (!link) return;
    // Kisisel veri gonderilmez, yalnizca sayfa yolu
    trackEvent("contact_email_click", { page_path: window.location.pathname });
  });
}
