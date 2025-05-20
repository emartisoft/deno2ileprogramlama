import { apiKey, model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
import { encodeBase64 } from "@std/encoding";
import mimetype from "mimetype";
import { FileState, GoogleAIFileManager } from "@google/generative-ai/server";
import { basename } from "@std/path";

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

/**
 * Belirtilen dosya yolundaki dosyayı
 * GoogleAIFileManager kullanarak yükler ve ACTIVE durumuna geldiğinde dosya URI'sini döndürür.
 * @param filePath Dosya yolu
 * @returns Dosya URI'si
 */
async function uploadLargeFile(
  filePath: string,
): Promise<string> {
  const fileManager = new GoogleAIFileManager(apiKey);
  const mimeType: string = mimetype.lookup(filePath);

  console.log(renderMarkdown(`> Dosya yükleme başlatılıyor...  \x1b[1A`));
  // Dosya yükleme isteği: displayName olarak dosya adını kullanıyoruz.
  const fileResponse = await fileManager.uploadFile(filePath, {
    displayName: basename(filePath),
    mimeType: mimeType,
  });

  let fileInfo = await fileManager.getFile(fileResponse.file.name);
  while (fileInfo.state !== FileState.ACTIVE) {
    console.log(
      renderMarkdown(`> _Dosya durumu: ${fileInfo.state}_ \x1b[1A`),
    );
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 saniye bekle
    fileInfo = await fileManager.getFile(fileResponse.file.name);
  }

  console.log(renderMarkdown(`> Dosya hazır. URI: ${fileInfo.uri} \x1b[1A`));
  return fileInfo.uri;
}

/**
 * Dosya yolunu alır ve GoogleAIFileManager kullanarak yükler,
 * ACTIVE durumuna geldiğinde dosya URI'sini döndürür.
 * @param path Dosya yolu
 * @returns Dosya URI'sini içeren GoogleGenerativeAI.Part objesi
 */
async function fileUriToGenerativePart(path: string) {
  const mimeType: string = mimetype.lookup(path);
  return {
    fileData: {
      // Dosya URI'sini kullan
      fileUri: await uploadLargeFile(path),
      mimeType,
    },
  };
}

// Video dosyalarını oku ve GoogleGenerativeAI.Part nesnelerine çevir
const videoParts = await Promise.all([
  fileToGenerativePart("./files/hello_deno.mp4"), // 1 MB'ın altında bir video
  fileUriToGenerativePart("./files/video.mp4"), // 12 MB'ın üzerinde bir video
]);
// Prompt oluştur
const prompt = "Videolardaki kodlama ile yapılmak istenen işlemler nelerdir?";
// Video dosyalarıyla birlikte içerik oluştur
const result = await model.generateContent([prompt, ...videoParts]);
// Oluşturulan içeriği Markdown formatında render ederek konsola yazdır
console.log(renderMarkdown(wrapAnsi(result.response.text(), 60)));
