// gemini.ts dosyasından modeli içe aktar
import { model } from "./gemini.ts";

// Modeli kullanarak içerik üret
const result = await model.generateContent([
  "Güneş Sistemi'nin kaç gezegeni vardır? Bilgi verir misin?",
]);

// Üretilen içeriği konsola yazdır
console.log(result.response.text());
