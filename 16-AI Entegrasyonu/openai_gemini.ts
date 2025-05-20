import OpenAI from "openai";
import "@std/dotenv/load";
import { renderMarkdown } from "@littletof/charmd";

// API anahtarını ortam değişkenlerinden al
const apiKey = Deno.env.get("GEMINI_API_KEY");
if (!apiKey) {
  console.error("API_KEY ortam değişkeni ayarlanmamış!");
  Deno.exit(1);
}

// OpenAI istemcisini başlat
const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Kullanıcıdan gelen mesajı işleyerek OpenAI API'sine gönder
const response = await openai.chat.completions.create({
  model: "gemini-2.0-flash",
  messages: [
    { role: "system", content: "Bir matematik öğretmeni gibi anlat." },
    {
      role: "user",
      content: Deno.args[0] ||
        "İki musluktan biri havuzu tek başına 6 saatte, " +
          "diğeri ise tek başına 12 saatte dolduruyor. Buna " +
          "göre, ikisi beraber havuzun tamamını kaç saatte doldurur?",
    },
  ],
});

// API'den gelen cevabı Markdown formatında render ederek konsola yazdır
console.log(
  renderMarkdown(
    response.choices[0].message.content?.toString() || "Cevap bulunamadı.",
  ),
);
