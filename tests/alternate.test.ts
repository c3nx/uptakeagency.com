import { describe, expect, test } from "bun:test";
import { hasAlternate } from "../src/lib/alternate";

const slugs = ["en/a", "tr/a", "en/only-en", "tr/only-tr"];

describe("hasAlternate", () => {
  test("EN sayfanın TR eşi varsa true", () => {
    expect(hasAlternate(slugs, "a", "en")).toBe(true);
  });
  test("TR sayfanın EN eşi varsa true", () => {
    expect(hasAlternate(slugs, "a", "tr")).toBe(true);
  });
  test("yalnız TR olan sayfada false", () => {
    expect(hasAlternate(slugs, "only-tr", "tr")).toBe(false);
  });
  test("yalnız EN olan sayfada false", () => {
    expect(hasAlternate(slugs, "only-en", "en")).toBe(false);
  });
  test("kendi dilindeki kayıt eş sayılmaz", () => {
    expect(hasAlternate(["tr/x"], "x", "tr")).toBe(false);
  });
  test("önek eşleşmesi tam olmalı", () => {
    expect(hasAlternate(["en/ab"], "a", "tr")).toBe(false);
  });
});
