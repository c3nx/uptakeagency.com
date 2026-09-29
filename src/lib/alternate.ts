// slugs: koleksiyon kayıt slug'ları ("en/x", "tr/x"); diğer dilde aynı slug var mı
export function hasAlternate(
  slugs: string[],
  slug: string,
  locale: "en" | "tr",
): boolean {
  const other = locale === "en" ? "tr" : "en";
  return slugs.includes(`${other}/${slug}`);
}
