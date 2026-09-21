import { describe, expect, test } from "bun:test";
import { CONSENT_STORAGE_KEY } from "../src/lib/consent";
import { createAnalytics } from "../src/lib/analytics";

const MEASUREMENT_ID = "G-TEST0000000";
const GA_DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;

type FakeScript = { async: boolean; src: string };
type FakeListener = (event: unknown) => void;

type FakeEnvOptions = {
  stored?: string | null;
  readThrows?: boolean;
  writeThrows?: boolean;
  removeThrows?: boolean;
  cookie?: string;
  cookieWriteThrows?: boolean;
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
  const docListeners = new Map<string, FakeListener[]>();
  const winListeners = new Map<string, FakeListener[]>();
  // Her yeniden yükleme anında kayıtlı tercihi de saklar, sıra böyle sabitlenir
  const reloadCalls: Array<string | null> = [];
  // Çerez yazımı ve yeniden yükleme aynı çizgide, sıra doğrulanabilsin
  const timeline: string[] = [];
  let cookieValue = options.cookie ?? "";

  function addTo(map: Map<string, FakeListener[]>, type: string, listener: FakeListener): void {
    const list = map.get(type) ?? [];
    list.push(listener);
    map.set(type, list);
  }

  const fakeWindow: Record<string, unknown> = {
    localStorage: {
      getItem(key: string): string | null {
        if (options.readThrows) throw new Error("localStorage okunamıyor");
        return store.get(key) ?? null;
      },
      setItem(key: string, value: string): void {
        if (options.writeThrows) throw new Error("localStorage yazılamıyor");
        store.set(key, value);
      },
      removeItem(key: string): void {
        if (options.removeThrows) throw new Error("localStorage silinemiyor");
        store.delete(key);
      },
    },
    location: {
      hostname: "uptakeagency.com",
      pathname: "/contact",
      reload(): void {
        reloadCalls.push(store.get(CONSENT_STORAGE_KEY) ?? null);
        timeline.push("reload");
      },
    },
    addEventListener(type: string, listener: FakeListener): void {
      addTo(winListeners, type, listener);
    },
  };

  const fakeDocument = {
    get cookie(): string {
      return cookieValue;
    },
    set cookie(written: string) {
      if (options.cookieWriteThrows) throw new Error("çerez yazılamıyor");
      cookieWrites.push(written);
      timeline.push(`cookie:${written.split("=")[0]}`);
    },
    head: {
      appendChild(node: unknown): void {
        appendedScripts.push(node as FakeScript);
      },
    },
    createElement(_tagName: string): FakeScript {
      return { async: false, src: "" };
    },
    addEventListener(type: string, listener: FakeListener): void {
      addTo(docListeners, type, listener);
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
    reloadCalls,
    timeline,
    clickListeners: docListeners.get("click") ?? [],
    storedValue: () => store.get(CONSENT_STORAGE_KEY) ?? null,
    setStored: (value: string) => store.set(CONSENT_STORAGE_KEY, value),
    clearStore: () => store.clear(),
    gaDisableFlag: () => fakeWindow[GA_DISABLE_KEY],
    fireStorage: (event: { key: string | null; newValue: string | null }) => {
      for (const listener of winListeners.get("storage") ?? []) listener(event);
    },
    firePageshow: (persisted: boolean) => {
      for (const listener of winListeners.get("pageshow") ?? []) listener({ persisted });
    },
    fireDocumentClick: (event: unknown) => {
      for (const listener of docListeners.get("click") ?? []) listener(event);
    },
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
    const env = createFakeEnv({ readThrows: true });
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

  test("çerez silme yeniden yüklemeden ÖNCE tamamlanır", () => {
    const env = createFakeEnv({ cookie: "_ga=1; _ga_XYZ=2" });
    env.analytics.enableAnalytics();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();

    const reloadIndex = env.timeline.indexOf("reload");
    const cookieIndexes = env.timeline
      .map((entry, index) => (entry.startsWith("cookie:") ? index : -1))
      .filter((index) => index >= 0);

    expect(reloadIndex).toBeGreaterThan(-1);
    expect(cookieIndexes.length).toBeGreaterThan(0);
    expect(Math.max(...cookieIndexes)).toBeLessThan(reloadIndex);
  });
});

describe("temizlik hatası kritik adımı engellemez", () => {
  test("çerez silme hata fırlatsa da yeniden yükleme yapılır", () => {
    const env = createFakeEnv({ stored: "granted", cookie: "_ga=1", cookieWriteThrows: true });
    env.analytics.applyStoredConsent();
    env.analytics.storeConsent("denied");
    expect(() => env.analytics.disableAnalytics()).not.toThrow();
    expect(env.reloadCalls).toHaveLength(1);
  });
});

describe("tercih yazımı geri okunarak doğrulanır", () => {
  test("başarılı yazım true döner", () => {
    const env = createFakeEnv();
    expect(env.analytics.storeConsent("denied")).toBe(true);
    expect(env.storedValue()).toBe("denied");
  });

  test("yazım başarısız ama silme başarılı: kayıt temizlenir, false döner", () => {
    const env = createFakeEnv({ stored: "granted", writeThrows: true });
    expect(env.analytics.storeConsent("denied")).toBe(false);
    expect(env.storedValue()).toBeNull();
  });

  test("ne yazılabiliyor ne silinebiliyor: false döner, eski kayıt kalır", () => {
    const env = createFakeEnv({ stored: "granted", writeThrows: true, removeThrows: true });
    expect(env.analytics.storeConsent("denied")).toBe(false);
    expect(env.storedValue()).toBe("granted");
  });

  test("kayıt hâlâ 'granted' okunuyorsa disableAnalytics yeniden yükleme yapmaz", () => {
    const env = createFakeEnv({ stored: "granted", writeThrows: true, removeThrows: true });
    env.analytics.applyStoredConsent();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();
    expect(env.reloadCalls).toHaveLength(0);
  });

  test("yeniden yükleme yapılmasa da belge içi kapılar kapanır", () => {
    const env = createFakeEnv({ stored: "granted", writeThrows: true, removeThrows: true });
    env.analytics.applyStoredConsent();
    env.analytics.storeConsent("denied");
    env.analytics.disableAnalytics();
    expect(env.gaDisableFlag()).toBe(true);
    env.analytics.trackEvent("generate_lead", { method: "contact_form" });
    expect(env.calls().filter((call) => call[0] === "event")).toHaveLength(0);
  });
});

describe("çok sekme: storage olayı onayı uzlaştırır", () => {
  test("granted'dan denied'a: bu belgede gtag yüklüyse yeniden yüklenir", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync(() => {});
    env.setStored("denied");
    env.fireStorage({ key: CONSENT_STORAGE_KEY, newValue: "denied" });
    expect(env.reloadCalls).toHaveLength(1);
    expect(env.gaDisableFlag()).toBe(true);
  });

  test("kayıt silindi (newValue null): yeniden yüklenir", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync(() => {});
    env.clearStore();
    env.fireStorage({ key: CONSENT_STORAGE_KEY, newValue: null });
    expect(env.reloadCalls).toHaveLength(1);
  });

  test("storage.clear (key null): depodan okunur, yeniden yüklenir", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync(() => {});
    env.clearStore();
    env.fireStorage({ key: null, newValue: null });
    expect(env.reloadCalls).toHaveLength(1);
  });

  test("gtag bu belgede yüklü değilse yeniden yükleme yapılmaz", () => {
    const env = createFakeEnv();
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync(() => {});
    env.fireStorage({ key: CONSENT_STORAGE_KEY, newValue: "denied" });
    expect(env.reloadCalls).toHaveLength(0);
  });

  test("ilgisiz anahtar yok sayılır", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync(() => {});
    env.fireStorage({ key: "tema", newValue: "koyu" });
    expect(env.reloadCalls).toHaveLength(0);
  });

  test("geri çağrı yeni tercihle çağrılır", () => {
    const seen: Array<string | null> = [];
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync((choice) => seen.push(choice));
    env.setStored("denied");
    env.fireStorage({ key: CONSENT_STORAGE_KEY, newValue: "denied" });
    expect(seen).toEqual(["denied"]);
  });

  test("başka sekmede kabul edilmesi bu belgede GA yüklemez", () => {
    const env = createFakeEnv();
    env.analytics.initConsentSync(() => {});
    env.setStored("granted");
    env.fireStorage({ key: CONSENT_STORAGE_KEY, newValue: "granted" });
    expect(env.appendedScripts).toHaveLength(0);
    expect(env.reloadCalls).toHaveLength(0);
  });
});

describe("bfcache: geri tuşuyla dönüşte onay yeniden okunur", () => {
  test("persisted=false: hiçbir şey yapılmaz", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync(() => {});
    env.setStored("denied");
    env.firePageshow(false);
    expect(env.reloadCalls).toHaveLength(0);
  });

  test("kayıt artık 'granted' değil ve gtag yüklü: yeniden yüklenir", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.applyStoredConsent();
    env.analytics.initConsentSync(() => {});
    env.setStored("denied");
    env.firePageshow(true);
    expect(env.reloadCalls).toHaveLength(1);
    expect(env.gaDisableFlag()).toBe(true);
  });

  test("kayıt 'granted' ve gtag bu belgede yüklü değil: GA yüklenir", () => {
    const env = createFakeEnv({ stored: "granted" });
    env.analytics.initConsentSync(() => {});
    env.firePageshow(true);
    expect(env.appendedScripts).toHaveLength(1);
    expect(env.reloadCalls).toHaveLength(0);
  });

  test("kayıt yok ve gtag yüklü değil: ne script ne yeniden yükleme", () => {
    const env = createFakeEnv();
    env.analytics.initConsentSync(() => {});
    env.firePageshow(true);
    expect(env.appendedScripts).toHaveLength(0);
    expect(env.reloadCalls).toHaveLength(0);
  });

  test("geri çağrı kayıtlı tercihle çağrılır", () => {
    const seen: Array<string | null> = [];
    const env = createFakeEnv({ stored: "denied" });
    env.analytics.initConsentSync((choice) => seen.push(choice));
    env.firePageshow(true);
    expect(seen).toEqual(["denied"]);
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
    env.fireDocumentClick({ target: { closest: (selector: string) => ({ selector }) } });
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
    const env = createFakeEnv({ writeThrows: true, removeThrows: true });
    expect(() => env.analytics.storeConsent("denied")).not.toThrow();
  });
});
