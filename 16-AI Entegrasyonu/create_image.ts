// Gemini yapılandırma ve API iletişim fonksiyonlarını içeren modülü içeri aktarır.
import * as geminiConfig from "./geminiconfig.ts";

// Ana asenkron fonksiyon, programın ana mantığını içerir.
async function main() {
  // Gemini modeline gönderilecek olan metin istemi (prompt).
  // Bu istem, modelden ne tür bir içerik (bu durumda bir resim) oluşturmasını istediğimizi belirtir.
  const promptText =
    "Masa üstünde dolu bir cam çay bardağı görüntüsü odaklanmış şekilde," +
    " arka planda ise istanbul kız kulesi ve boğaziçi görüntüsü olan bir resim oluştur.";

  // geminiconfig modülündeki generateResponse fonksiyonunu kullanarak API'ye istek gönderir ve yanıtı alır.
  const response = await geminiConfig.generateResponse(promptText);

  // API yanıtından içerik parçalarını (parts) alır. Yanıt boş veya hatalıysa boş bir dizi döner.
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  // Yanıttaki her bir parça üzerinde döngü başlatır.
  for (const part of parts) {
    // Eğer parça metin içeriyorsa, metni konsola yazdırır.
    if (part.text) {
      console.log(part.text);
      // Eğer parça Base64 kodlanmış resim verisi içeriyorsa (inlineData), bu veriyi işler.
    } else if (part.inlineData?.data) {
      // Base64 kodlanmış resim verisini alır.
      const imageData = part.inlineData.data;
      // Base64 verisini çözerek ikili (binary) veriye dönüştürür.
      const binary = atob(imageData);
      // İkili veriyi bir Uint8Array (işaretsiz 8-bit tamsayı dizisi) içine kopyalar.
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      // Oluşturulacak resim dosyasının adını belirler.
      const filename = "create_image.png";
      // Deno'nun writeFile fonksiyonunu kullanarak resim verisini dosyaya yazar.
      await Deno.writeFile(filename, bytes);
      console.log(`Resim dosyası oluşturuldu: ${filename}`);
    }
  }
}

// Eğer bu betik doğrudan çalıştırılıyorsa (başka bir modül tarafından import edilmiyorsa), main fonksiyonunu çağırır.
if (import.meta.main) {
  main();
}
