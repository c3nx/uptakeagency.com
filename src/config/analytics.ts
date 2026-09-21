// GA4 olcum kimligi. Gercek deger buraya elle yazilir, fallback/varsayilan YOK.
export const GA_MEASUREMENT_ID = "";

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{6,}$/;

/**
 * Build sirasinda calisir: kimlik gecersizse derlemeyi durdurur.
 * Boylece hesapsiz/kimliksiz olcum kodu canliya cikamaz.
 */
export function assertGaMeasurementId(id: string): string {
  if (!GA_MEASUREMENT_ID_PATTERN.test(id)) {
    throw new Error(
      `GA_MEASUREMENT_ID gecersiz: ${JSON.stringify(id)}. ` +
        "src/config/analytics.ts icindeki GA_MEASUREMENT_ID sabitine gercek GA4 olcum kimligini yazin " +
        "(G- ile baslar, ardindan en az 6 buyuk harf/rakam gelir). Fallback deger kullanilmaz.",
    );
  }
  return id;
}
