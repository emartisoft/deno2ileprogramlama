// fs standart kütüphanesi import edilir.
import { copy, exists } from "@std/fs";
// Dosya var mı yok mu kontrol etmek için exists fonksiyonu kullanılır.
const kaynak = await exists("./kaynak.txt");

// Eğer kaynak.txt dosyası yoksa hata mesajı verilir ve program sonlandırılır.
if (!kaynak) {
  console.log("kaynak.txt dosyası bulunamadı.");
  Deno.exit(1);
}

// Dosyaları kopyalamak için copy fonksiyonu kullanılır.
await copy("kaynak.txt", "hedef.txt", { overwrite: true });
console.log("kaynak.txt dosyası hedef.txt dosyasına kopyalandı.");
