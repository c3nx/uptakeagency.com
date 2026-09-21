import { describe, expect, test } from "bun:test";
import { CONSENT_STORAGE_KEY } from "../src/lib/consent";
import { createAnalytics } from "../src/lib/analytics";

const MEASUREMENT_ID = "G-TEST0000000";
const GA_DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;

type FakeScript = { async: boolean; src: string };
type ClickListener = (event: unknown) => void;

type FakeEnvOptions = {
  stored?: string | null;
  storageThrows?: boolean;
  cookie?: string;
};

// dataLayer basımlarını zaman çizgisine kaydeden dizi
function instrumentedDataLayer(timeline: string[]): unknown[] {
  const layer: unknown[] = [];
  const originalPush = layer.push.bind(layer);
  layer.push = (...items: unknown[]): number => {
    for (const item of items) {
      timeline.push(`dataLayer:${String(Array.from(item as ArrayLike<unknown>)[0])}`);
    }
    return originalPush(...items);
  };
  return layer;
}

// Elle yazılmış minimal sahte ortam. Yeni bağımlılık yok, üretim kodu olduğu gibi koşar.
function createFakeEnv(options: FakeEnvOptions = {}) {
  const store = new Map<string, string>();
  if (options.stored != null) store.set(CONSENT_STORAGE_KEY, options.stored);

  const appendedScripts: FakeScript[] = [];
  const cookieWrites: string[] = [];
  const clickListeners: ClickListener[] = [];
  // Her yeniden yükleme anında kayıtlı tercihi de saklar, sıra böyle sabitlenir
  const reloadCalls: Array<string | null> = [];
  let cookieValue = options.cookie ?? "";

  const fakeWindow: Record<string, unknown> = {
    localStorage: {
      getItem(key: string): string | null {
        if (options.storageThrows) throw new Error("localStorage erişilemez");
        return store.get(key) ?? null;
      },
      setItem(key: string, value: string): void {
        if (options.storageThrows) throw new Error("localStorage erişilemez");
        store.set(key, value);
      },
    },
    location: {
      hostname: "uptakeagency.com",
      pathname: "/contact",
      reload(): void {
        reloadCalls.push(store.get(CONSENT_STORAGE_KEY) ?? null);
      },
    },
  };

  const fakeDocument = {
    get cookie(): string {
      return cookieValue;
    },
    set cookie(written: string) {
      cookieWrites.push(written);
    },
    head: {
      appendChild(node: unknown): void {
        appendedScripts.push(node as FakeScript);
      },
    },
    createElement(_tagName: string): FakeScript {
      return { async: false, src: "" };
    },
    addEventListener(_type: string, listener: ClickListener): void {
      clickListeners.push(listener);
    },
  };

  const analytics = createAnalytics({
    window: fakeWindow as unknown as Window,
    document: fakeDocument as unknown as Document,
    measurementId: MEASUREMENT_ID,
  });

  return {
    analytics,
    fakeWindow,
    appendedScripts,
    cookieWrites,
    clickListeners,
    reloadCalls,
    storedValue: () => store.get(CONSENT_STORAGE_KEY) ?? null,
    gaDisableFlag: () => fakeWindow[GA_DISABLE_KEY],
    // dataLayer'a basılan arguments nesnelerini düz diziye çevirir
    calls: (): unknown[][] => {
      const layer = (fakeWindow.dataLayer ?? []) as ArrayLike<unknown>[];
      return Array.from(layer).map((entry) => Array.from(entry));
    },
    commandNames: (): string[] => {
      const layer = (fakeWindow.dataLayer ?? []) as ArrayLike<unknown>[];
      return Array.from(layer).map((entry) => String(Array.from(entry)[0]));
    },
  };
}

describe("onay yokken hiçbir şey yüklenmez", () => {
  test("kayıtlı tercih yok: script eklenmez, js/config basılmaz", () => {
    const env = createFakeEnv();
    expect(env.analytics.applyStoredConsent()).toBeNull();
    expect(env.appendedScripts).toHaveLength(0);
    expect(env.commandNames()).not.toContain("js");
    expect(env.commandNames()).not.toContain("config");
  });

  test("kayıtlı 'denied': script eklenmez", () => {
    const env = createFakeEnv({ stored: "denied" });
    expect(env.analytics.applyStoredConsent()).toBe("denied");
    expect(env.appendedScripts).toHaveLength(0);
  });

  const brokenValues = ["GRANTED", "true", "accepted", '{"consent":"granted"}', "a8s7d!%_"];
  for (const value of brokenValues) {
    test(`bozuk değer "${value}": onay yok sayılır, script eklenmez`, () => {
      const env = createFakeEnv({ stored: value });
      expect(env.analytics.applyStoredConsent()).toBeNull();
      expect(env.appendedScripts).toHaveLength(0);
    });
  }

  test("localStorage.getItem hata fırlatıyor: onay yok sayılır, script eklenmez", () => {
    const env = createFakeEnv({ storageThrows: true });
    expect(env.analytics.applyStoredConsent()).toBeNull();
    expect(env.appendedScripts).toHaveLength(0);
  });
});

describe("onay verilince gtag.js yüklenir", () => {
  test("kayıtlı 'granted': tam olarak bir script, doğru kaynak", () => {
    const env = createFakeEnv({ stored: "granted" });
    expect(env.analytics.applyStoredConsent()).toBe("granted");
    expect(env.appendedScripts).toHaveLength(1);
    expect(env.appendedScripts[0]!.src).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`,
    );
    expect(env.appendedScripts[0]!.async).toBe(true);
  });

  test("dataLayer sırası: consent default, consent update, js, config", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    const calls = env.calls();

    expect(calls[0]!.slice(0, 2)).toEqual(["consent", "default"]);
    expect(calls[0]![2]).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });

    expect(calls[1]!.slice(0, 2)).toEqual(["consent", "update"]);
    expect(calls[1]![2]).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });

    expect(calls[2]![0]).toBe("js");
    expect(calls[3]).toEqual(["config", MEASUREMENT_ID]);
  });

  test("enableAnalytics iki kez çağrılsa da tek script kalır", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.enableAnalytics();
    expect(env.appendedScripts).toHaveLength(1);
  });
});

describe("kabul sonrası reddetme aynı sayfada ölçümü durdurur", () => {
  test("kabul: trackEvent dataLayer'a event basar", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.trackEvent("generate_lead", { method: "contact_form" });
    const events = env.calls().filter((call) => call[0] === "event");
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual(["event", "generate_lead", { method: "contact_form" }]);
  });

  test("kabul sonrası reddet: trackEvent hiçbir şey basmaz", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.disableAnalytics();
    const before = env.calls().length;
    env.analytics.trackEvent("generate_lead", { method: "contact_form" });
    expect(env.calls()).toHaveLength(before);
    expect(env.calls().filter((call) => call[0] === "event")).toHaveLength(0);
  });

  test("kabul sonrası reddet: ga-disable anahtarı true olur", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.disableAnalytics();
    expect(env.gaDisableFlag()).toBe(true);
  });

  test("reddetme consent update denied basar", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.disableAnalytics();
    const updates = env.calls().filter((call) => call[0] === "consent" && call[1] === "update");
    expect(updates.at(-1)![2]).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });
});

// Gerçek tarayıcı ölçümü gösterdi: gtag.js bir kez yüklendikten sonra ga-disable güvenilir
// değil, kendi kuyruğu ve dinleyicileri istek göndermeye devam edebiliyor. Tek kesin çözüm
// sayfayı Google kodu olmadan yeniden yüklemek.
describe("geri almada sayfa Google kodu olmadan yeniden yüklenir", () => {
  test("kabul sonrası reddet: yeniden yükleme tam bir kez çağrılır", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();
    expect(env.reloadCalls).toHaveLength(1);
  });

  test("yeniden yükleme anında kayıtlı tercih 'denied' olmalı", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();
    expect(env.reloadCalls[0]).toBe("denied");
  });

  test("hiç kabul edilmeden reddet: yeniden yükleme yok", () => {
    const env = createFakeEnv();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();
    expect(env.reloadCalls).toHaveLength(0);
  });

  test("kayıtlı 'granted' ile açılan sayfada reddet: yeniden yükleme yapılır", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();
    expect(env.reloadCalls).toHaveLength(1);
    expect(env.reloadCalls[0]).toBe("denied");
  });

  test("yeniden yüklemeden önce çerezler silinmiş olmalı", () => {
    const env = createFakeEnv({ cookie: "_ga=1; _ga_XYZ=2" });
    env.analytics.enableAnalytics();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();
    expect(env.cookieWrites.some((written) => written.startsWith("_ga="))).toBe(true);
    expect(env.reloadCalls).toHaveLength(1);
  });
});

describe("reddetme sonrası yeniden kabul", () => {
  test("ga-disable false olur, script yine tek kalır, ölçüm yeniden çalışır", () => {
    const env = createFakeEnv();
    env.analytics.enableAnalytics();
    env.analytics.disableAnalytics();
    env.analytics.enableAnalytics();

    expect(env.gaDisableFlag()).toBe(false);
    expect(env.appendedScripts).toHaveLength(1);

    env.analytics.trackEvent("contact_email_click", { page_path: "/contact" });
    expect(env.calls().filter((call) => call[0] === "event")).toHaveLength(1);
  });

  test("ga-disable false ataması config çağrısından önce gelir", () => {
    const env = createFakeEnv();
    const timeline: string[] = [];
    let disableValue: unknown;

    // Atama anını ve dataLayer basımlarını tek bir zaman çizgisinde topla
    Object.defineProperty(env.fakeWindow, GA_DISABLE_KEY, {
      configurable: true,
      get: () => disableValue,
      set: (value: unknown) => {
        disableValue = value;
        timeline.push(`ga-disable=${String(value)}`);
      },
    });
    env.fakeWindow.dataLayer = instrumentedDataLayer(timeline);

    env.analytics.enableAnalytics();

    const disableIndex = timeline.indexOf("ga-disable=false");
    const configIndex = timeline.indexOf("dataLayer:config");
    expect(disableIndex).toBeGreaterThan(-1);
    expect(configIndex).toBeGreaterThan(-1);
    expect(disableIndex).toBeLessThan(configIndex);
  });
});

describe("onay verilmeden ölçüm olayı", () => {
  test("trackEvent hiçbir şey basmaz ve hata fırlatmaz", () => {
    const env = createFakeEnv();
    expect(() => env.analytics.trackEvent("generate_lead", { method: "contact_form" })).not.toThrow();
    expect(env.calls()).toHaveLength(0);
  });

  test("mailto tıklaması onaysızken sessiz kalır", () => {
    const env = createFakeEnv();
    env.analytics.initMailtoTracking();
    env.clickListeners[0]!({ target: { closest: (selector: string) => ({ selector }) } });
    expect(env.calls()).toHaveLength(0);
  });
});

describe("reddetmede GA çerezleri silinir", () => {
  test("_ga ve _ga_XYZ için silme yazılır, other çerezine dokunulmaz", () => {
    const env = createFakeEnv({ cookie: "_ga=1; _ga_XYZ=2; other=3" });
    env.analytics.enableAnalytics();
    env.analytics.disableAnalytics();

    expect(env.cookieWrites.some((written) => written.startsWith("_ga="))).toBe(true);
    expect(env.cookieWrites.some((written) => written.startsWith("_ga_XYZ="))).toBe(true);
    expect(env.cookieWrites.some((written) => written.startsWith("other="))).toBe(false);
    // Silme yazımları süreyi sıfırlamalı
    expect(env.cookieWrites.every((written) => written.includes("Max-Age=0"))).toBe(true);
  });
});

describe("storeConsent", () => {
  test("tercihi depoya yazar", () => {
    const env = createFakeEnv();
    env.analytics.storeConsent("granted");
    expect(env.storedValue()).toBe("granted");
  });

  test("depolama hata fırlatsa da çağrı patlamaz", () => {
    const env = createFakeEnv({ storageThrows: true });
    expect(() => env.analytics.storeConsent("denied")).not.toThrow();
  });
});
