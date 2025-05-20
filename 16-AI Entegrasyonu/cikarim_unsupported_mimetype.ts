import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
import { encodeBase64 } from "@std/encoding";
import mimetype from "mimetype";

/**
 * Dosyayı okuyup, base64 formatına çevirerek GoogleGenerativeAI.Part
 * nesnesi döndüren asenkron fonksiyon.
 * @param path Dosya yolu
 * @returns GoogleGenerativeAI.Part nesnesi
 */
async function fileToGenerativePart(path: string) {
  const data = await Deno.readFile(path);
  const mimeType: string = mimetype.lookup(path);
  return {
    inlineData: {
      // Dosyayı base64 formatına çevir
      data: encodeBase64(data),
      mimeType,
    },
  };
}

// Resim dosyalarını oku ve GoogleGenerativeAI.Part nesnelerine çevir
const imageParts = await Promise.all([
  fileToGenerativePart("./files/deno.epub"), // desteklenmeyen bir dosya türü
]);
// Prompt oluştur
const prompt =
  "Epub dosyasındaki karakterler kimdir? Hikayenin ana fikri nedir?";
// Resimlerle birlikte içerik oluştur
const result = await model.generateContent([prompt, ...imageParts]);
// Oluşturulan içeriği Markdown formatında render ederek konsola yazdır
console.log(renderMarkdown(wrapAnsi(result.response.text(), 60)));
