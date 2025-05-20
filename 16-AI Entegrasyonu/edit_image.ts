// Gemini yapılandırma ve API istemcisini içeren modülü içeri aktarır.
import * as geminiConfig from "./geminiconfig.ts";
// Google GenAI kütüphanesinden yanıt türlerini (Modality) içeri aktarır.
import { Modality } from "npm:@google/genai";
// Deno'nun standart kütüphanesinden Base64 kodlama fonksiyonunu içeri aktarır.
import { encodeBase64 as base64Encode } from "jsr:@std/encoding";

// Ana asenkron fonksiyon, resim düzenleme mantığını içerir.
async function main() {
  // Düzenlenecek olan mevcut resim dosyasının yolu.
  const imagePath = "./create_image.png";
  // Deno'nun readFile fonksiyonu ile resim dosyasını okur (ham byte verisi olarak).
  const raw = await Deno.readFile(imagePath);
  // Okunan ham byte verisini Base64 formatına kodlar. API'ye bu formatta gönderilir.
  const base64Image = base64Encode(raw);

  // Gemini API'sine gönderilecek içeriği hazırlar. Bu bir dizi objedir.
  const contents = [
    {
      // İlk obje: Düzenleme talimatını içeren metin istemi (prompt).
      text: "Resme uçan bir martı ekle.",
    },
    {
      // İkinci obje: Düzenlenecek olan resmin Base64 kodlanmış verisi ve MIME türü.
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  // geminiConfig modülündeki 'ai' istemcisini kullanarak 'generateContent' metodunu çağırır.
  const response = await geminiConfig.ai.models.generateContent({
    // Kullanılacak model adı (geminiconfig'den alınır veya varsayılan kullanılır).
    model: geminiConfig.modelName || "gemini-2.0-flash-exp-image-generation",
    // API'ye gönderilecek içerik (metin istemi ve resim verisi).
    contents,
    // Yanıt yapılandırması: Hem metin hem de resim türünde yanıtlar beklendiğini belirtir.
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  // API'den gelen yanıtın içerik parçalarını (parts) alır ve işler. Yanıt boşsa veya hatalıysa boş dizi döner.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    // Eğer parça metin içeriyorsa, metni konsola yazdırır.
    if (part.text) {
      console.log(part.text);
      // Eğer parça Base64 kodlanmış resim verisi içeriyorsa (inlineData), bu veriyi işler.
    } else if (part.inlineData?.data) {
      // Base64 kodlanmış resim verisini alır.
      const data = part.inlineData.data;
      // Base64 verisini çözerek ikili (binary) veriye dönüştürür.
      const binary = atob(data);
      // İkili veriyi bir Uint8Array (işaretsiz 8-bit tamsayı dizisi) içine kopyalar.
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      // Düzenlenmiş resmin kaydedileceği dosya adını belirler.
      const outFile = "./edited-image.png";
      // Deno'nun writeFile fonksiyonunu kullanarak düzenlenmiş resim verisini dosyaya yazar.
      await Deno.writeFile(outFile, bytes);
      console.log(`Düzenleme sonrası resim kaydedildi: ${outFile}`);
    }
  }
}

// Eğer bu betik doğrudan çalıştırılıyorsa (başka bir modül tarafından import edilmiyorsa), main fonksiyonunu çağırır.
if (import.meta.main) {
  main();
}
