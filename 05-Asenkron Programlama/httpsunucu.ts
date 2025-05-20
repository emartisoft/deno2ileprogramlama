import { Application, Context } from "@oak/oak";

// Sunucuyu olustur
const app = new Application();

// Asenkron fonksiyon
app.use(async (ctx: Context) => {
  try {
    // Asenkron veri alma
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/99",
    );
    // Asenkron veri okuma
    const jsondata = await response.json();
    // Asenkron veri yazma
    ctx.response.body = "Merhaba, asenkron Deno! JSON Title: " + jsondata.title;
  } catch (error) {
    // Hata durumu
    ctx.response.status = 500;
    ctx.response.body = "Sunucu hatası!";
    console.error("Hata:", error);
  }
});

console.log("Sunucu http://localhost:8000 adresinde çalışıyor");
// Sunucuyu baslat
await app.listen({ port: 8000 });
