// deno standard path kutuphanesini kullanarak
// dosya yolu işlemleri yapma
import { basename, extname, join } from "@std/path";
// join fonksiyonu ile dosya yolları birleştirilir.
const dosyaYolu = join("src", "moduls", "ornek.ts");
console.log("Dosya yolu:", dosyaYolu);
// basename fonksiyonu ile dosya adı alınır.
console.log("Dosya  adı:", basename(dosyaYolu));
// extname fonksiyonu ile dosya uzantısı alınır.
console.log("Dosya uzantısı:", extname(dosyaYolu));
