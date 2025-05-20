// Ortam değişkenlerini .env dosyasından yükler (örneğin, API anahtarı).
import "@std/dotenv/load";
// Google Generative AI kütüphanesini ve yanıt türlerini (Modality) içeri aktarır.
import { GoogleGenAI, Modality } from "@google/genai";

// Kullanılacak Gemini modelinin adını ortam değişkenlerinden alır.
export const modelName = Deno.env.get("GEMINI_MODEL2");
// Eğer model adı ortam değişkenlerinde tanımlı değilse, hata verir ve programı sonlandırır.
if (!modelName) {
  console.error("GEMINI_MODEL2 environment variable is not set!");
  Deno.exit(1);
}

// Google API anahtarını ortam değişkenlerinden alır.
export const apiKey = Deno.env.get("GEMINI_API_KEY");
// Eğer API anahtarı ortam değişkenlerinde tanımlı değilse, hata verir ve programı sonlandırır.
if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable is not set!");
  Deno.exit(1);
}

// Alınan API anahtarı ile GoogleGenAI istemcisini (client) başlatır.
export const ai = new GoogleGenAI({ apiKey });

// Verilen bir metin istemine (prompt) göre Gemini API'sine istek gönderip yanıt alan asenkron fonksiyon.
export async function generateResponse(promptText: string) {
  // ai istemcisini kullanarak 'generateContent' metodunu çağırır.
  const response = await ai.models.generateContent({
    // Kullanılacak model adı (eğer ortam değişkeninde yoksa varsayılan model kullanılır).
    model: modelName || "gemini-2.0-flash-exp-image-generation",
    // API'ye gönderilecek içerik (kullanıcının girdiği metin istemi).
    contents: [promptText],
    // Yanıt yapılandırması: Hem metin hem de resim türünde yanıtlar beklendiğini belirtir.
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  // API'den gelen yanıtı döndürür.
  return response;
}
