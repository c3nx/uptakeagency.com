import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";

const source = readFileSync("src/components/sections/home/Services.astro", "utf8");
const slugs = [...source.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const cardCount = [...source.matchAll(/cmd:\s*"/g)].length;

describe("ana sayfa hizmet kartları", () => {
  test("her kartın bir slug'ı var", () => {
    expect(cardCount).toBe(5);
    expect(slugs.length).toBe(cardCount);
  });

  test("kartlar bağlantı olarak render edilir", () => {
    expect(source).toContain("getLocalizedPath(`/services/${service.slug}`, locale)");
  });

  for (const locale of ["tr", "en"]) {
    test(`her slug için ${locale} içerik dosyası var`, () => {
      for (const slug of slugs) {
        expect(existsSync(`src/content/services/${locale}/${slug}.md`)).toBe(true);
      }
    });
  }
});
