import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
import { encodeBase64 } from "@std/encoding";

/**
 * Dosyayı okuyup, base64 formatına çevirerek GoogleGenerativeAI.Part
 * nesnesi döndüren asenkron fonksiyon.
 * @param path Dosya yolu
 * @param mimeType Dosya mimeType'i
 * @returns GoogleGenerativeAI.Part nesnesi
 */
async function fileToGenerativePart(path: string, mimeType: string) {
  const data = await Deno.readFile(path);
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
  fileToGenerativePart("./files/dino1.png", "image/png"),
  fileToGenerativePart("./files/dino2.png", "image/png"),
]);
// Prompt oluştur
const prompt = "Resimlerdeki Dino'lar arasındaki farklar nelerdir?";
// Resimlerle birlikte içerik oluştur
const result = await model.generateContent([prompt, ...imageParts]);
// Oluşturulan içeriği Markdown formatında render ederek konsola yazdır
console.log(renderMarkdown(wrapAnsi(result.response.text(), 60)));
