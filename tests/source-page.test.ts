import { describe, expect, test } from "bun:test";
import { getSourcePage } from "../src/lib/source-page";

const origin = "https://uptakeagency.com";

describe("getSourcePage", () => {
  test("aynı site: yol döner", () => {
    expect(getSourcePage(`${origin}/tr/services/ai-consulting`, origin)).toBe(
      "/tr/services/ai-consulting",
    );
  });

  test("aynı site: sorgu dizesi korunur", () => {
    expect(getSourcePage(`${origin}/blog?utm_source=x`, origin)).toBe("/blog?utm_source=x");
  });

  test("aynı site: hash atılır", () => {
    expect(getSourcePage(`${origin}/blog#baslik`, origin)).toBe("/blog");
  });

  test("boş referrer: direct", () => {
    expect(getSourcePage("", origin)).toBe("direct");
  });

  test("farklı site: yalnızca hostname", () => {
    expect(getSourcePage("https://www.google.com/search?q=gizli&x=1", origin)).toBe(
      "external: www.google.com",
    );
  });

  test("bozuk referrer: unknown", () => {
    expect(getSourcePage("not a url", origin)).toBe("unknown");
  });
});
