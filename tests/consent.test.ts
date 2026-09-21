import { describe, expect, test } from "bun:test";
import {
  CONSENT_STORAGE_KEY,
  gaCookieNamesToClear,
  parseStoredConsent,
  toConsentModeState,
} from "../src/lib/consent";

describe("CONSENT_STORAGE_KEY", () => {
  test("sabit bir anahtar adı verir", () => {
    expect(typeof CONSENT_STORAGE_KEY).toBe("string");
    expect(CONSENT_STORAGE_KEY.length).toBeGreaterThan(0);
  });
});

describe("parseStoredConsent", () => {
  test("'granted' değerini tanır", () => {
    expect(parseStoredConsent("granted")).toBe("granted");
  });

  test("'denied' değerini tanır", () => {
    expect(parseStoredConsent("denied")).toBe("denied");
  });

  // Tanınmayan her şey "onay yok" demek, asla granted değil
  const unknownValues: Array<[string, string | null]> = [
    ["null", null],
    ["boş string", ""],
    ["büyük harf", "GRANTED"],
    ["true", "true"],
    ["json", '{"x":1}'],
    ["çöp", "a8s7d!%_"],
    ["boşluklu", " granted "],
    ["accepted", "accepted"],
  ];

  for (const [label, value] of unknownValues) {
    test(`${label} girdisi null döner`, () => {
      expect(parseStoredConsent(value)).toBeNull();
    });
  }
});

describe("toConsentModeState", () => {
  test("granted: yalnızca analytics_storage açılır", () => {
    expect(toConsentModeState("granted")).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
  });

  test("denied: dört anahtar da denied", () => {
    expect(toConsentModeState("denied")).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });

  test("null (tercih yok): dört anahtar da denied", () => {
    expect(toConsentModeState(null)).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });

  test("reklam anahtarları hiçbir girdide granted olmaz", () => {
    for (const choice of ["granted", "denied", null] as const) {
      const state = toConsentModeState(choice);
      expect(state.ad_storage).toBe("denied");
      expect(state.ad_user_data).toBe("denied");
      expect(state.ad_personalization).toBe("denied");
    }
  });
});

describe("gaCookieNamesToClear", () => {
  test("yalnızca _ga ve _ga_* çerezlerini seçer", () => {
    expect(gaCookieNamesToClear("_ga=1; _ga_ABC=2; other=3; _gat=1")).toEqual([
      "_ga",
      "_ga_ABC",
    ]);
  });

  test("boş çerez dizesinde boş liste döner", () => {
    expect(gaCookieNamesToClear("")).toEqual([]);
  });

  test("GA çerezi yoksa boş liste döner", () => {
    expect(gaCookieNamesToClear("session=abc; theme=dark")).toEqual([]);
  });

  test("aynı isim birden fazla geçerse tekrar etmez", () => {
    expect(gaCookieNamesToClear("_ga=1; _ga=2")).toEqual(["_ga"]);
  });

  test("boşluksuz ayracı da işler", () => {
    expect(gaCookieNamesToClear("_ga=1;_ga_XY9=2")).toEqual(["_ga", "_ga_XY9"]);
  });
});
