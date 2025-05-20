/**
 * Belirtilen dosya yolundaki dosyayı asenkron olarak okur
 * ve okunan dosya içeriğini konsola yazar.
 * Eğer hata oluşursa hatayı konsola yazar.
 * @param filePath Okunacak dosyanın yolu
 */
async function readFileAsync(filePath: string) {
  try {
    const data = await Deno.readTextFile(filePath);
    console.log("Dosya içeriği:\n", data);
  } catch (error) {
    console.error("Dosya okunurken hata oluştu:", error);
  }
}
// Dosya okuma işlemini asenkron olarak gerçekleştirir.
readFileAsync("./file.txt");
