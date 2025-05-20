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

// Resim ve PDF dosyalarını oku ve GoogleGenerativeAI.Part nesnelerine çevir
const imageParts = await Promise.all([
  fileToGenerativePart("./files/dino1.png"),
  fileToGenerativePart("./files/dino2.png"),
  fileToGenerativePart("./files/Zıtların Buluşması.pdf"),
]);
// Prompt oluştur
//const prompt = "Resimlerdeki Dino'lar arasındaki farklar nelerdir?";
const prompt =
  "Zıtların Buluşması adlı PDF dosyasındaki karakterler kimdir? Hikayenin ana fikri nedir?";
// Resimlerle birlikte içerik oluştur
const result = await model.generateContent([prompt, ...imageParts]);
// Oluşturulan içeriği Markdown formatında render ederek konsola yazdır
console.log(renderMarkdown(wrapAnsi(result.response.text(), 60)));
