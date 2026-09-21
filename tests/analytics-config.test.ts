import { describe, expect, test } from "bun:test";
import { assertGaMeasurementId, GA_MEASUREMENT_ID } from "../src/config/analytics";

describe("assertGaMeasurementId", () => {
  const invalid = ["", "G-", "UA-12345-1", "GTM-ABC1234", "g-abc1234", "G-ABC12"];

  for (const id of invalid) {
    test(`"${id}" reddedilir`, () => {
      expect(() => assertGaMeasurementId(id)).toThrow();
    });

    test(`"${id}" hatasının mesajı sabitin adını söyler`, () => {
      expect(() => assertGaMeasurementId(id)).toThrow(/GA_MEASUREMENT_ID/);
    });
  }

  test("hata mesajı tam Türkçe imla ile yazılmıştır", () => {
    expect(() => assertGaMeasurementId("")).toThrow(/geçersiz/);
    expect(() => assertGaMeasurementId("")).toThrow(/ölçüm kimliğini/);
  });

  test("geçerli kimlik kabul edilir ve aynen döner", () => {
    expect(assertGaMeasurementId("G-ABC1234XYZ")).toBe("G-ABC1234XYZ");
  });

  test("fallback yok: geçersiz kimlikte sessizce varsayılan dönmez", () => {
    let returned: string | undefined;
    try {
      returned = assertGaMeasurementId("");
    } catch {
      returned = undefined;
    }
    expect(returned).toBeUndefined();
  });
});

describe("GA_MEASUREMENT_ID", () => {
  test("sabit bir dizedir", () => {
    expect(typeof GA_MEASUREMENT_ID).toBe("string");
  });

  test("repodaki kimlik geçerli GA4 kalıbına uyar", () => {
    expect(assertGaMeasurementId(GA_MEASUREMENT_ID)).toBe(GA_MEASUREMENT_ID);
  });

  test("repoda geçici doğrulama değeri kalmamıştır", () => {
    expect(GA_MEASUREMENT_ID.startsWith("G-TEST")).toBe(false);
  });
});
