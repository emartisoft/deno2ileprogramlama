/**
 * Dosya okuma işlemini callback ile gerçekleştirmek
 *
 * @param filePath - Okunacak dosyanın yolu
 * @param callback - Okuma işleminin sonucu için callback fonksiyonu
 */
function readFileCallback(
  filePath: string,
  callback: (err: Error | null, data?: string) => void,
) {
  // Dosyanın okunma işlemini gerçekleştirilir.
  // Eğer hata olursa callback fonksiyonu ile hatayı gönderilir.
  // Eğer hata yoksa okunan dosya içeriğini callback fonksiyonu ile gönderilir.
  Deno.readTextFile(filePath)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
}

// Kullanım
readFileCallback("./file.txt", (err, data) => {
  if (err) {
    console.error("Hata:", err);
  } else {
    console.log("Dosya içeriği:\n", data);
  }
});
