// Ziyaretçinin iletişim sayfasından önce baktığı sayfayı kısa metne çevirir
export function getSourcePage(referrer: string, currentOrigin: string): string {
  if (!referrer) return "direct";
  let url: URL;
  try {
    url = new URL(referrer);
  } catch {
    return "unknown";
  }
  // Üçüncü taraf adresi sızmasın diye yalnızca hostname
  if (url.origin !== currentOrigin) return `external: ${url.hostname}`;
  return url.pathname + url.search;
}
