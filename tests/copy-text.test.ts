import { describe, expect, test } from "bun:test";
import { copyText, type CopyDeps } from "../src/lib/copy-text";

// Sahte textarea ve document üretir; çağrıları kaydeder
function fakeDocument(execResult: boolean | "throw") {
  const calls = { appended: 0, removed: 0, selected: 0, exec: [] as string[] };
  const textarea = {
    value: "",
    style: {} as Record<string, string>,
    setAttribute() {},
    focus() {},
    select() {
      calls.selected++;
    },
    remove() {
      calls.removed++;
    },
  };
  const doc = {
    createElement: () => textarea,
    body: {
      appendChild() {
        calls.appended++;
      },
    },
    execCommand(cmd: string) {
      calls.exec.push(cmd);
      if (execResult === "throw") throw new Error("yok");
      return execResult;
    },
  };
  return { doc: doc as unknown as CopyDeps["document"], textarea, calls };
}

describe("copyText", () => {
  test("clipboard API varsa onu kullanır ve true döner", async () => {
    const yazilan: string[] = [];
    const { doc, calls } = fakeDocument(true);
    const sonuc = await copyText("a@b.c", {
      clipboard: { writeText: async (t: string) => void yazilan.push(t) },
      document: doc,
    });
    expect(sonuc).toBe(true);
    expect(yazilan).toEqual(["a@b.c"]);
    expect(calls.exec).toEqual([]);
  });

  test("clipboard reddederse yedek yola düşer", async () => {
    const { doc, textarea, calls } = fakeDocument(true);
    const sonuc = await copyText("a@b.c", {
      clipboard: { writeText: async () => Promise.reject(new Error("izin yok")) },
      document: doc,
    });
    expect(sonuc).toBe(true);
    expect(textarea.value).toBe("a@b.c");
    expect(calls.exec).toEqual(["copy"]);
    expect(calls.removed).toBe(1);
  });

  test("clipboard yoksa yedek yolu kullanır", async () => {
    const { doc, calls } = fakeDocument(true);
    const sonuc = await copyText("a@b.c", { clipboard: undefined, document: doc });
    expect(sonuc).toBe(true);
    expect(calls.exec).toEqual(["copy"]);
  });

  test("yedek yol da başarısızsa false döner ve geçici öğeyi temizler", async () => {
    const { doc, calls } = fakeDocument(false);
    const sonuc = await copyText("a@b.c", { clipboard: undefined, document: doc });
    expect(sonuc).toBe(false);
    expect(calls.removed).toBe(1);
  });

  test("execCommand hata fırlatırsa false döner", async () => {
    const { doc, calls } = fakeDocument("throw");
    const sonuc = await copyText("a@b.c", { clipboard: undefined, document: doc });
    expect(sonuc).toBe(false);
    expect(calls.removed).toBe(1);
  });

  test("clipboard ve document yoksa false döner", async () => {
    expect(await copyText("a@b.c", { clipboard: undefined, document: undefined })).toBe(false);
  });
});
