// gemini.ts dosyasından modeli içe aktar
import { model } from "./gemini.ts";
// Markdown render etmek için gerekli modülleri içe aktar
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
// HTML içeriğini parse etmek için DOMParser'ı içe aktar
import { DOMParser } from "@b-fuze/deno-dom";

// URL'den içerik çekmek için fonksiyon
async function fetchURLContent(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`URL içeriği alınamadı: ${response.statusText}`);
  }
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const bodycontent = doc?.body?.textContent || "";
  return bodycontent.replace(/<[^>]+>/g, " ");
}

// URL'yi komut satırı argümanlarından al
const url = Deno.args[0];
if (!url) {
  console.error(
    "Kullanım: deno run --allow-net --allow-env url_ozetle.ts <URL>",
  );
  Deno.exit(1);
}

// URL'den içerik çek ve özetle
console.log(`URL'den içerik çekiliyor: ${url}`);
let htmltext = await fetchURLContent(url);
htmltext = "Lütfen aşağıdaki metni özetle:\n" + htmltext;
const result = await model.generateContent([htmltext]);

// Özetlenen içeriği Markdown formatında render ederek konsola yazdır
console.log(renderMarkdown(wrapAnsi(result.response.text(), 100)));
