// deno standard datetime kutuphanesini kullanarak
// tarih ve saat formatlama islemi yapma
import { format } from "@std/datetime";
// Şu anki tarihi almak için new Date() fonksiyonu kullanılır.
const now = new Date();
// format fonksiyonu ile tarih ve saat formatlama işlemi yapılır.
console.log(format(now, "dd-MM-yyyy"));
