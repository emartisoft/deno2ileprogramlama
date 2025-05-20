import { Handlers } from "$fresh/server.ts";
import { libcamera } from "@andrewiski/libcamera";
import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import { encodeBase64 } from "@std/encoding";

async function fileToGenerativePart(path: string, mimeType: string) {
  const data = await Deno.readFile(path);
  return {
    inlineData: {
      // Dosyayı base64 formatına çevir
      data: encodeBase64(data),
      mimeType,
    },
  };
}

async function getDataUri(filePath: string, mimeType: string): Promise<string> {
  const data = await Deno.readFile(filePath);
  const base64Data = encodeBase64(data);
  return `data:${mimeType};base64,${base64Data}`;
}

export const handler: Handlers = {
  async GET(_req) {
    const timestamp: string = new Date().getTime().toString();
    const capturedImage: string = `capture${timestamp}.jpg`;
    const pathCapturedImage: string = `./captured/${capturedImage}`;

    await libcamera
      .jpeg({ config: { output: pathCapturedImage, nopreview: true } });

    // Dosyanın oluşturulmasını beklemek için döngü
    while (true) {
      try {
        await Deno.stat(pathCapturedImage);
        break; // Dosya mevcut, döngüden çık
      } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
          // Dosya henüz oluşturumadı, 100ms bekle
          await new Promise((resolve) => setTimeout(resolve, 100));
        } else {
          throw e;
        }
      }
    }

    // Resim dosyalarını oku ve GoogleGenerativeAI.Part nesnelerine çevir
    const imageParts = await Promise.all([
      fileToGenerativePart(pathCapturedImage, "image/jpg"),
    ]);
    // Prompt oluştur
    const prompt = "Resimde neler oldugunu anlatır mısın?";
    // Resim(ler)le birlikte içerik oluştur
    const result = await model.generateContent([prompt, ...imageParts]);
    // Oluşturulan içeriği Markdown formatında render ederek değişkene ata
    const comment = renderMarkdown(result.response.text());
    // Görüntüyü img tag'ının src attribute'ne base64 olarak kodlamak için data uri oluştur
    const imageSrc = await getDataUri(pathCapturedImage, "image/jpeg");

    return new Response(
      JSON.stringify({ comment, imageSrc }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
