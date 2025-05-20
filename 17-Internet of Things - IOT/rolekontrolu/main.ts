import { Hono } from "hono";
import * as Rpi from "@emarti/gpiopins";

// Raspberry Pi GPIO 18 numaralı pinini çıkış olarak ayarlıyoruz.
// Bu pin üzerinde bir röle bağlı olduğunu varsayıyoruz.
// Röle ile bir cihazı (örneğin, bir odanın lambası) açıp kapatacağız.
const chip = new Rpi.GpioChip();
const gpio18 = chip.getLine(18);
gpio18.requestOutput("my-test-relay", Rpi.PinValue.High);

// Hono uygulamasını oluşturuyoruz.
const app = new Hono();

// Ana sayfa için bir GET endpointi oluşturuyoruz.
app.get("/", async (c) => {
  // Bu endpoint, index.html dosyasını döndürecek.
  const html = await Deno.readTextFile("./index.html");
  return c.html(html);
});

// /toggle endpointi için bir POST endpointi oluşturuyoruz.
// Bu endpoint, röleyi açıp kapatmak için kullanılacak.
app.post("/toggle", async (c) => {
  const { state } = await c.req.json();
  console.log("Toggle durumu:", state);

  // Eğer state "ON" ise, röle açılacak.
  // Eğer state "OFF" ise, röle kapatılacak.
  if (state === "ON") {
    gpio18.setValue(Rpi.PinValue.Low);
  } else {
    gpio18.setValue(Rpi.PinValue.High);
  }

  return c.json({
    message: `Backend fonksiyonu ${state} durumuyla tetiklendi.`,
  });
});

// Uygulamayı belirtilen port üzerinde çalıştırıyoruz.
// Bu uygulama, 8080 portu üzerinden çalışacak.
Deno.serve(app.fetch);
