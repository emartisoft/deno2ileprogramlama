// gemini.ts dosyasından modeli ve değişkenleri içe aktar
import { initialInstruction, model, modelname } from "./gemini.ts";
// Markdown render etmek için gerekli modülleri içe aktar
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

// Geçmişin kaydı için boş dizi oluştur
const chatHistory: string[] = [];
// Kolon genişliği
const columnWidth = 80;

// Braille spinner animasyonu için karakterler
const brailleSpinner = [
  "\u280B", // ⠋
  "\u2819", // ⠙
  "\u2839", // ⠹
  "\u2838", // ⠸
  "\u283C", // ⠼
  "\u2834", // ⠴
  "\u282E", // ⠦
  "\u282F", // ⠧
  "\u2807", // ⠇
  "\u280F", // ⠏
];

// Sohbet geçmişini kullanarak prompt oluşturma fonksiyonu
function buildPrompt(history: string[]): string {
  // Geçmişin başına başlangıç mesajını ekleyerek prompt oluştur
  return `${initialInstruction}\n${history.join("\n")}\n AI:`;
}

// Başlangıç mesajını ekrana yazdır
console.log(" ");
console.log(
  renderMarkdown(
    `> _Merhaba! Ben bir metin tabanlı AI asistanıyım.
     Gemini Model Varyantım: \` ${modelname} \`
     Chat uygulaması başlatıldı. Çıkmak için **boş bir giriş** yapın._`,
  ),
);

(async () => {
  while (true) {
    // Kullanıcıdan giriş alıyoruz.
    const userInput = prompt(renderMarkdown("## *\` Sen \`*"));
    // Kullanıcıdan boş giriş alındığında çıkış yapılıyor.
    if (userInput === null || userInput.trim() === "") {
      console.log(renderMarkdown("> _Çıkış yapılıyor..._"));
      break;
    }
    // Kullanıcı mesajını geçmişe ekliyoruz.
    chatHistory.push(userInput);

    // Tüm sohbet geçmişini içeren prompt'u oluşturuyoruz.
    const promptText = buildPrompt(chatHistory);

    let index = 0;

    // Spinner animasyonunu başlat
    const spinner = setInterval(() => {
      Deno.stdout.write(
        new TextEncoder().encode(
          renderMarkdown(
            `? **_Düşünüyorum_ ${
              brailleSpinner[index % brailleSpinner.length]
            }**\x1B[A\r`,
          ),
        ),
      );
      index++;
    }, 100);

    try {
      // Gemini API'ye sohbet geçmişi içeren prompt'u gönder.
      const result = await model.generateContent([promptText]);
      // API'den gelen cevabı al
      const response = await result.response;
      const assistantReply = await response.text();

      // Spinner animasyonunu durdur
      clearInterval(spinner);
      Deno.stdout.write(new TextEncoder().encode("\r"));

      // Asistanın cevabını ekrana yaz
      console.log(" ".repeat(100));
      console.log(renderMarkdown("## *\`  AI \`*"));
      console.log("\x1B[A\x1B[A\r");
      console.log(renderMarkdown(wrapAnsi(assistantReply, columnWidth)));

      // Asistan cevabını ekrana yazdırıp, geçmişe ekle.
      chatHistory.push(assistantReply);
    } catch (error) {
      // Hata durumunda spinner animasyonunu durdur ve hatayı yazdır
      clearInterval(spinner);
      Deno.stdout.write(new TextEncoder().encode("\r"));
      console.error("Hata oluştu:", error);
    }
  }
})();
