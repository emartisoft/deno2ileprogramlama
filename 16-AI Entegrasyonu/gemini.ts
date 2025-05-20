// Gerekli modülleri içe aktar ve ortam değişkenlerini yükle
import { GoogleGenerativeAI } from "@google/generative-ai";
import "@std/dotenv/load";

// Model adını ortam değişkenlerinden al
export const modelname = Deno.env.get("GEMINI_MODEL");
if (!modelname) {
  console.error("Gemini Model değişkeni ayarlanmamış!");
  Deno.exit(1);
}

// API anahtarını ortam değişkenlerinden al
const key = Deno.env.get("GEMINI_API_KEY");
if (!key) {
  console.error("API_KEY ortam değişkeni ayarlanmamış!");
  Deno.exit(1);
}
export const apiKey: string = key;

// Başlangıç talimatını ortam değişkenlerinden al
export const initialInstruction = Deno.env.get("GEMINI_INITIAL_INSTRUCTION");
if (!initialInstruction) {
  console.error("Başlangıç talimatı değişkeni ayarlanmamış!");
  Deno.exit(1);
}

// API anahtarı ile Google Generative AI'yi başlat
const genAI = new GoogleGenerativeAI(apiKey);

// Model adını kullanarak üretici modeli al
export const model = genAI.getGenerativeModel({ model: modelname });
