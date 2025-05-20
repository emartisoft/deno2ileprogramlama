// Deno'nun standart kütüphanesinden walk fonksiyonunu içe aktar
import { walk } from "@std/fs";

async function listFiles() {
  // Tarama yapılacak kök dizin
  const rootDir = "./";

  try {
    // walk fonksiyonu ile dizini tarama
    for await (
      const entry of walk(rootDir, {
        // İsteğe bağlı: Sadece .txt uzantılı dosyaları filtrele
        match: [/\.txt$/],
        // İsteğe bağlı: Maksimum tarama derinliği (örneğin 2 seviye)
        maxDepth: 2,
      })
    ) {
      console.log(`Bulunan yol: ${entry.path}, Dosya mı?: ${entry.isFile}`);
    }
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
}

// Fonksiyonu çalıştır
listFiles();
