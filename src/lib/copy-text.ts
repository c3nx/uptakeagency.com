// Panoya kopyalama: Clipboard API, yoksa geçici textarea + execCommand
export type CopyDeps = {
  clipboard?: { writeText(text: string): Promise<void> };
  document?: Document;
};

function copyWithTextarea(text: string, doc: Document): boolean {
  const area = doc.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  area.style.top = "0";
  doc.body.appendChild(area);
  try {
    area.focus();
    area.select();
    return doc.execCommand("copy");
  } catch {
    return false;
  } finally {
    area.remove();
  }
}

export async function copyText(text: string, deps?: CopyDeps): Promise<boolean> {
  const clipboard = deps ? deps.clipboard : globalThis.navigator?.clipboard;
  const doc = deps ? deps.document : globalThis.document;

  if (clipboard) {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // izin yok ya da güvenli bağlam değil: yedek yola düş
    }
  }
  return doc ? copyWithTextarea(text, doc) : false;
}
