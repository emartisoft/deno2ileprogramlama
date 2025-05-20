import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

const files: string[] = ["file3.ts"]; // İşlenecek dosyaları belirtir
const outdir: string = "outjs"; // Çıkış dizinini belirtir

try {
  // Esbuild ile dosyaları bundle eder
  await esbuild.build({
    plugins: [...denoPlugins()], // Deno için gerekli pluginleri ekler
    entryPoints: files, // İşlenecek dosyaları belirtir
    outdir: outdir, // Çıkış dizinini belirtir
    bundle: true, // Bundle işlemini aktif eder
    minify: false, // Minify seçeneğini ayarlar
    format: "esm", // Çıkış formatını ESM olarak ayarlar
  });
  // Eğer verbose modu aktifse, işlemin tamamlandığını yazdırır
  console.log("Bundling is completed");
} catch (error) {
  // Hata durumunda hatayı yazdırır
  console.error("Error: " + error);
}

// Esbuild işlemini durdurur
esbuild.stop();
