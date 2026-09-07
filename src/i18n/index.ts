import en from "./en.json";
import tr from "./tr.json";

type Locale = "en" | "tr";

const translations: Record<Locale, typeof en> = { en, tr };

export function getLocale(url: URL): Locale {
  const [, segment] = url.pathname.split("/");
  return segment === "tr" ? "tr" : "en";
}

export function t(locale: Locale): typeof en {
  return translations[locale];
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean;
  // kök path için /tr/ değil /tr dönmeli (trailing slash yok)
  if (clean === "/") return "/tr";
  return `/tr${clean}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "tr" : "en";
}
