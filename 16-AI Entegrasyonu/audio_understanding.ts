// Gerekli modülleri ve yapılandırmaları içe aktar
import { createPartFromUri, createUserContent } from "@google/genai";
import * as geminiConfig from "./geminiconfig.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

// Ana işlevi tanımla
async function main(): Promise<void> {
  // İşlenecek ses dosyasının yolu
  const filePath = "./files/istanbulu_dinliyorum.mp3";
  let fileData: Uint8Array;
  try {
    // Ses dosyasını oku
    fileData = await Deno.readFile(filePath);
  } catch (err) {
    // Dosya okuma hatası durumunda hata mesajı yazdır ve çık
    console.error(`File read error: ${filePath}`, err);
    Deno.exit(1);
  }

  // Dosyayı Gemini AI'a yükle
  const myfile = await geminiConfig.ai.files.upload({
    file: new Blob([fileData]),
    config: { mimeType: "audio/mp3" },
  });

  // İçerik oluştur ve modeli çalıştır
  const response = await geminiConfig.ai.models.generateContent({
    // Kullanılacak model adını belirle (varsayılan olarak belirli bir model kullanılır)
    model: geminiConfig.modelName ?? "gemini-2.0-flash",
    // Modelin işleyeceği içeriği oluştur (ses dosyası URI'si ve metin istemi)
    contents: createUserContent([
      createPartFromUri(myfile.uri ?? "", myfile.mimeType ?? ""),
      "Ses kaydını içeriğinin ana fikrini ve önemli noktalarını belirleyecek şekilde özetle.",
    ]),
  });

  // Modelden gelen yanıtı markdown formatında ve belirli bir genişliğe sararak konsola yazdır
  console.log(
    renderMarkdown(
      wrapAnsi(response.text ?? "", 100),
    ),
  );
}
// Ana işlevi çağır
await main();
