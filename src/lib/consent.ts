// Ziyaretci onayinin saf mantigi. DOM/tarayici API'si kullanmaz, testten dogrudan cagrilir.

export const CONSENT_STORAGE_KEY = "uptake_consent_v1";

export type ConsentChoice = "granted" | "denied";

export type ConsentModeState = {
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
  analytics_storage: ConsentChoice;
};

/** Kayitli degeri okur. Taninmayan her girdi "onay yok" (null) sayilir, asla granted degil. */
export function parseStoredConsent(raw: string | null): ConsentChoice | null {
  if (raw === "granted") return "granted";
  if (raw === "denied") return "denied";
  return null;
}

/** Consent Mode v2 durumu. Sitede reklam yok: uc reklam anahtari her zaman denied. */
export function toConsentModeState(choice: ConsentChoice | null): ConsentModeState {
  return {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: choice === "granted" ? "granted" : "denied",
  };
}

/** document.cookie dizesinden silinecek GA cerez adlarini cikarir (_ga ve _ga_*). */
export function gaCookieNamesToClear(cookieString: string): string[] {
  const names = new Set<string>();
  for (const pair of cookieString.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (!name) continue;
    if (name === "_ga" || name.startsWith("_ga_")) names.add(name);
  }
  return [...names];
}
