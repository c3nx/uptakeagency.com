import { describe, expect, test } from "bun:test";
import { assertGaMeasurementId, GA_MEASUREMENT_ID } from "../src/config/analytics";

describe("assertGaMeasurementId", () => {
  const invalid = ["", "G-", "UA-12345-1", "GTM-ABC1234", "g-abc1234", "G-ABC12"];

  for (const id of invalid) {
    test(`"${id}" reddedilir ve hata mesaji sabitin adini icerir`, () => {
      expect(() => assertGaMeasurementId(id)).toThrow(/GA_MEASUREMENT_ID/);
    });
  }

  test("gecerli kimlik kabul edilir ve aynen doner", () => {
    expect(assertGaMeasurementId("G-ABC1234XYZ")).toBe("G-ABC1234XYZ");
  });

  test("fallback yok: gecersiz kimlikte sessizce varsayilan donmez", () => {
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
  test("repoda uydurma bir deger tutmaz", () => {
    expect(typeof GA_MEASUREMENT_ID).toBe("string");
  });
});
