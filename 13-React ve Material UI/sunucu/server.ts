// Oak framework'ünden Application'ı içe aktarır
import { Application } from "@oak/oak";
// CORS desteği için oakCors modülünü içe aktarır
import { oakCors } from "@tajpouria/cors";
// Yerel IP adresini almak için getLocalIP fonksiyonunu içe aktarır
import { getLocalIP } from "./getip.ts";
// API rotalarını içe aktarır
import router from "./routes.ts";

// Yeni bir Oak uygulaması oluşturur
const app = new Application();

// CORS desteğini ekler
app.use(oakCors());

// Router'ı uygulamaya ekler
app.use(router.routes());

// Router'ın izin verilen metodlarını ekler
app.use(router.allowedMethods());

// yerel ip adresi
const ip: string = getLocalIP()[0];

// yerel ip adresi değişkeni atanamamış ise uygulamadan çık
if (ip.startsWith("Yerel")) {
  console.log(ip); // Yerel IP bulunamadı
  Deno.exit();
}

// Server'ın çalıştığı adresi konsola yazdırır
console.log(`Server http://${ip}:8000 üzerinde çalışıyor...`);

// Uygulamayı belirtilen portta dinlemeye başlar
await app.listen({ hostname: ip, port: 8000 });
