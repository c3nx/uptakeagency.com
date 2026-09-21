// GA4 yükleyicisi. Ortam (window/document) dışarıdan verilir, böylece tarayıcıda çalışan kodun
// aynısı testte sahte nesnelerle koşturulabilir.

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

export interface AnalyticsEnv {
  window: Window;
  document: Document;
  measurementId: string;
}

// Onay başka bir sekmede ya da bfcache dönüşünde değiştiğinde çağrılır, DOM işi bileşende kalır
export type ConsentChangeHandler = (choice: ConsentChoice | null) => void;

export interface Analytics {
  readStoredConsent(): ConsentChoice | null;
  storeConsent(choice: ConsentChoice): boolean;
  enableAnalytics(): void;
  disableAnalytics(): void;
  applyStoredConsent(): ConsentChoice | null;
  trackEvent(name: string, params?: Record<string, string>): void;
  initMailtoTracking(): void;
  initConsentSync(onConsentChanged: ConsentChangeHandler): void;
}

export function createAnalytics({ window: win, document: doc, measurementId }: AnalyticsEnv): Analytics {
  let defaultsPushed = false;
  let gtagLoaded = false;
  // Ölçüm kapısı gtag'in yüklü olmasına değil, şu anki onaya bakar
  let consentGranted = false;

  // Google'ın resmi kapatma anahtarı: true iken gtag.js yüklü olsa bile istek göndermez
  const gaDisableKey = `ga-disable-${measurementId}`;

  function setGaDisabled(disabled: boolean): void {
    (win as unknown as Record<string, unknown>)[gaDisableKey] = disabled;
  }

  const gtag: (...args: unknown[]) => void = function () {
    win.dataLayer = win.dataLayer ?? [];
    // gtag.js dataLayer'da arguments nesnesi bekler
    win.dataLayer.push(arguments);
  };

  // Consent Mode v2 varsayılanı: dört anahtar da denied, gtag yüklenmeden önce basılır
  function pushConsentDefaults(): void {
    if (defaultsPushed) return;
    defaultsPushed = true;
    gtag("consent", "default", toConsentModeState(null));
  }

  // Kayıtlı tercih okunamazsa onay yok sayılır
  function readStoredConsent(): ConsentChoice | null {
    try {
      return parseStoredConsent(win.localStorage.getItem(CONSENT_STORAGE_KEY));
    } catch {
      return null;
    }
  }

  // Yazımı geri okuyarak doğrular. Tutmadıysa kaydı silmeye çalışır: kayıt yok = onay yok.
  function storeConsent(choice: ConsentChoice): boolean {
    try {
      win.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Yazılamadı, aşağıdaki doğrulama yakalar
    }
    if (readStoredConsent() === choice) return true;
    try {
      win.localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // Silinemedi de: eski kayıt yerinde kalır, çağıran buna göre davranır
    }
    return false;
  }

  // GA çerezlerini alan adı ve yol varyantlarıyla siler
  function clearGaCookies(): void {
    const names = gaCookieNamesToClear(doc.cookie);
    if (names.length === 0) return;

    const host = win.location.hostname;
    const parts = host.split(".");
    const domains = new Set<string>(["", host, `.${host}`]);
    // sub.example.com için .example.com gibi üst alan adı varyantları
    for (let i = 1; i < parts.length - 1; i += 1) {
      domains.add(`.${parts.slice(i).join(".")}`);
    }

    const paths = new Set<string>(["/", win.location.pathname]);

    for (const name of names) {
      for (const domain of domains) {
        for (const path of paths) {
          const domainPart = domain ? `; domain=${domain}` : "";
          doc.cookie = `${name}=; Max-Age=0; path=${path}${domainPart}`;
        }
      }
    }
  }

  // Onay verildi: consent update, ardından js ve config, en son gtag.js dinamik olarak eklenir
  function enableAnalytics(): void {
    pushConsentDefaults();
    consentGranted = true;
    gtag("consent", "update", toConsentModeState("granted"));
    // config'ten önce: yeniden kabulde kapatma anahtarı kalkmış olmalı
    setGaDisabled(false);
    if (gtagLoaded) return;
    gtagLoaded = true;

    gtag("js", new Date());
    gtag("config", measurementId);

    const script = doc.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    doc.head.appendChild(script);
  }

  // Onay geri alındı: çerezler silinir ve sayfa Google kodu olmadan yeniden yüklenir.
  // Yüklenmiş gtag.js'i yerinde susturmak güvenilir değil: gerçek tarayıcı ölçümünde
  // ga-disable true iken bile reddetmeden saniyeler sonra collect isteği gitti.
  function disableAnalytics(): void {
    consentGranted = false;
    setGaDisabled(true);
    // Temizlik en iyi çaba: hatası kritik adım olan yeniden yüklemeyi engellemesin
    try {
      pushConsentDefaults();
      gtag("consent", "update", toConsentModeState("denied"));
    } catch {
      // dataLayer yazılamadı
    }
    try {
      clearGaCookies();
    } catch {
      // Çerez silinemedi
    }
    // gtag bu sayfada hiç yüklenmediyse yeniden yüklemeye gerek yok
    if (!gtagLoaded) return;
    // Kayıt hâlâ granted okunuyorsa yeniden yükleme ölçümü geri açardı
    if (readStoredConsent() === "granted") return;
    win.location.reload();
  }

  // Onay bu belge dışında geri alındı: kapıları kapat, gtag yüklüyse temiz sayfaya dön
  function revokeInThisDocument(): void {
    consentGranted = false;
    if (!gtagLoaded) return;
    setGaDisabled(true);
    win.location.reload();
  }

  // Sayfa açılışında kayıtlı tercihi uygular, tercih yoksa hiçbir şey yüklenmez
  function applyStoredConsent(): ConsentChoice | null {
    const choice = readStoredConsent();
    if (choice === "granted") enableAnalytics();
    return choice;
  }

  // Onay yoksa ya da geri alındıysa sessiz no-op, asla hata fırlatmaz
  function trackEvent(name: string, params: Record<string, string> = {}): void {
    try {
      if (!consentGranted) return;
      gtag("event", name, params);
    } catch {
      // Ölçüm hiçbir zaman sayfayı kırmaz
    }
  }

  // mailto bağlantıları için document seviyesinde delegated dinleyici
  function initMailtoTracking(): void {
    doc.addEventListener("click", (event: Event) => {
      const target = event.target as { closest?: (selector: string) => unknown } | null;
      if (!target || typeof target.closest !== "function") return;
      if (!target.closest('a[href^="mailto:"]')) return;
      // Kişisel veri gönderilmez, yalnızca sayfa yolu
      trackEvent("contact_email_click", { page_path: win.location.pathname });
    });
  }

  // Diğer sekmeler ve bfcache dönüşü ile onayı uzlaştırır
  function initConsentSync(onConsentChanged: ConsentChangeHandler): void {
    win.addEventListener("storage", (event) => {
      // key null: storage.clear(). Başka anahtarlar bizi ilgilendirmiyor.
      if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return;
      const nextChoice =
        event.key === null ? readStoredConsent() : parseStoredConsent(event.newValue);
      onConsentChanged(nextChoice);
      // Kabul yönünde otomatik yükleme yok: bu sekmede kullanıcı eylemi olmadan Google kodu gelmez
      if (nextChoice !== "granted") revokeInThisDocument();
    });

    win.addEventListener("pageshow", (event) => {
      if (!event.persisted) return;
      const choice = readStoredConsent();
      onConsentChanged(choice);
      if (choice !== "granted") {
        revokeInThisDocument();
        return;
      }
      if (!gtagLoaded) enableAnalytics();
    });
  }

  return {
    readStoredConsent,
    storeConsent,
    enableAnalytics,
    disableAnalytics,
    applyStoredConsent,
    trackEvent,
    initMailtoTracking,
    initConsentSync,
  };
}
