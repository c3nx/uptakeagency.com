import { describe, expect, test } from "bun:test";
import {
  CONSENT_STORAGE_KEY,
  gaCookieNamesToClear,
  parseStoredConsent,
  toConsentModeState,
} from "../src/lib/consent";

describe("CONSENT_STORAGE_KEY", () => {
  test("sabit bir anahtar adi verir", () => {
    expect(typeof CONSENT_STORAGE_KEY).toBe("string");
    expect(CONSENT_STORAGE_KEY.length).toBeGreaterThan(0);
  });
});

describe("parseStoredConsent", () => {
  test("'granted' degerini tanir", () => {
    expect(parseStoredConsent("granted")).toBe("granted");
  });

  test("'denied' degerini tanir", () => {
    expect(parseStoredConsent("denied")).toBe("denied");
  });

  // Taninmayan her sey "onay yok" demek, asla granted degil
  const unknownValues: Array<[string, string | null]> = [
    ["null", null],
    ["bos string", ""],
    ["buyuk harf", "GRANTED"],
    ["true", "true"],
    ["json", '{"x":1}'],
    ["cop", "a8s7d!%_"],
    ["bosluklu", " granted "],
    ["accepted", "accepted"],
  ];

  for (const [label, value] of unknownValues) {
    test(`${label} girdisi null doner`, () => {
      expect(parseStoredConsent(value)).toBeNull();
    });
  }
});

describe("toConsentModeState", () => {
  test("granted: yalnizca analytics_storage acilir", () => {
    expect(toConsentModeState("granted")).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
  });

  test("denied: dort anahtar da denied", () => {
    expect(toConsentModeState("denied")).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });

  test("null (tercih yok): dort anahtar da denied", () => {
    expect(toConsentModeState(null)).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });

  test("reklam anahtarlari hicbir girdide granted olmaz", () => {
    for (const choice of ["granted", "denied", null] as const) {
      const state = toConsentModeState(choice);
      expect(state.ad_storage).toBe("denied");
      expect(state.ad_user_data).toBe("denied");
      expect(state.ad_personalization).toBe("denied");
    }
  });
});

describe("gaCookieNamesToClear", () => {
  test("yalnizca _ga ve _ga_* cerezlerini secer", () => {
    expect(gaCookieNamesToClear("_ga=1; _ga_ABC=2; other=3; _gat=1")).toEqual([
      "_ga",
      "_ga_ABC",
    ]);
  });

  test("bos cerez dizesinde bos liste doner", () => {
    expect(gaCookieNamesToClear("")).toEqual([]);
  });

  test("GA cerezi yoksa bos liste doner", () => {
    expect(gaCookieNamesToClear("session=abc; theme=dark")).toEqual([]);
  });

  test("ayni isim birden fazla gecerse tekrar etmez", () => {
    expect(gaCookieNamesToClear("_ga=1; _ga=2")).toEqual(["_ga"]);
  });

  test("bosluksuz ayraci da isler", () => {
    expect(gaCookieNamesToClear("_ga=1;_ga_XY9=2")).toEqual(["_ga", "_ga_XY9"]);
  });
});
