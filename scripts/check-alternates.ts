import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SITE_HOST = "uptakeagency.com";

function htmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name === "index.html") out.push(full);
  }
  return out;
}

// "/" -> index.html, "/x/y" -> x/y/index.html, "/tr" -> tr/index.html
function targetExists(distDir: string, path: string): boolean {
  const clean = path.split(/[?#]/)[0].replace(/^\/+|\/+$/g, "");
  return existsSync(join(distDir, clean, "index.html"));
}

function attr(tag: string, name: string): string | undefined {
  const re = new RegExp(String.raw`\s${name}\s*=\s*["']([^"']*)["']`, "i");
  return tag.match(re)?.[1];
}

export function findBrokenAlternates(distDir: string): string[] {
  const broken: string[] = [];
  for (const file of htmlFiles(distDir)) {
    const html = readFileSync(file, "utf8");
    const rel = relative(distDir, file).replaceAll("\\", "/");

    for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
      const lang = attr(tag, "hreflang");
      const href = attr(tag, "href");
      if (!lang || !href) continue;
      let url: URL;
      try {
        url = new URL(href, `https://${SITE_HOST}`);
      } catch {
        continue;
      }
      if (url.hostname !== SITE_HOST) continue;
      if (!targetExists(distDir, url.pathname))
        broken.push(`${rel}: hreflang=${lang} -> ${url.pathname} (hedef yok)`);
    }

    for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
      if (!/\sdata-lang-switch(\s|=|>|\/)/.test(tag)) continue;
      const href = attr(tag, "href");
      if (href && !targetExists(distDir, href))
        broken.push(`${rel}: dil anahtarı -> ${href} (hedef yok)`);
    }
  }
  return broken;
}

if (import.meta.main) {
  const dir = process.argv[2] ?? "dist";
  const broken = findBrokenAlternates(dir);
  if (broken.length > 0) {
    console.error(broken.join("\n"));
    console.error(`${broken.length} kırık alternatif bağlantı`);
    process.exit(1);
  }
  console.log("0 kırık alternatif bağlantı");
}
