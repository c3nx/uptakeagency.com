import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { findBrokenAlternates } from "../scripts/check-alternates";

let dist: string;

function page(path: string, html: string) {
  const file = join(dist, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const hreflang = (href: string) =>
  `<link rel="alternate" hreflang="en" href="${href}" />`;
const switcher = (href: string) =>
  `<a href="${href}" data-lang-switch aria-label="English">EN</a>`;

beforeEach(() => {
  dist = mkdtempSync(join(tmpdir(), "alt-"));
  page("index.html", "<html></html>");
  page("tr/index.html", "<html></html>");
});
afterEach(() => rmSync(dist, { recursive: true, force: true }));

describe("findBrokenAlternates", () => {
  test("hedefi olmayan hreflang raporlanır", () => {
    page(
      "tr/blog/x/index.html",
      hreflang("https://uptakeagency.com/blog/x"),
    );
    const broken = findBrokenAlternates(dist);
    expect(broken.length).toBe(1);
    expect(broken[0]).toContain("/blog/x");
  });

  test("hreflang yoksa ve anahtar ana sayfaya gidiyorsa rapor boş", () => {
    page("tr/blog/x/index.html", switcher("/"));
    expect(findBrokenAlternates(dist)).toEqual([]);
  });

  test("hedefi olan hreflang raporlanmaz (kök ve tr dahil)", () => {
    page(
      "about/index.html",
      hreflang("https://uptakeagency.com/") +
        hreflang("https://uptakeagency.com/tr"),
    );
    expect(findBrokenAlternates(dist)).toEqual([]);
  });

  test("kırık dil anahtarı bağlantısı raporlanır", () => {
    page("tr/blog/x/index.html", switcher("/blog/x"));
    const broken = findBrokenAlternates(dist);
    expect(broken.length).toBe(1);
    expect(broken[0]).toContain("/blog/x");
  });

  test("başka alan adlarının hreflang'ı yok sayılır", () => {
    page("index.html", hreflang("https://example.com/yok"));
    expect(findBrokenAlternates(dist)).toEqual([]);
  });
});
