// GA4 ölçüm kimliği. Gerçek değer buraya elle yazılır, fallback/varsayılan YOK.
export const GA_MEASUREMENT_ID = "";

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{6,}$/;

// Build sırasında çalışır: kimlik geçersizse derlemeyi durdurur,
// böylece hesapsız/kimliksiz ölçüm kodu canlıya çıkamaz.
export function assertGaMeasurementId(id: string): string {
  if (!GA_MEASUREMENT_ID_PATTERN.test(id)) {
    throw new Error(
      `GA_MEASUREMENT_ID geçersiz: ${JSON.stringify(id)}. ` +
        "src/config/analytics.ts içindeki GA_MEASUREMENT_ID sabitine gerçek GA4 ölçüm kimliğini yazın " +
        "(G- ile başlar, ardından en az 6 büyük harf veya rakam gelir). Fallback değer kullanılmaz.",
    );
  }
  return id;
}
