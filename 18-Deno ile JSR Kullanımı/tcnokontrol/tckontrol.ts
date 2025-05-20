/**
 * TC Kimlik Numarası doğrulama fonksiyonu,
 * This is a TypeScript function named kontrolEt that validates
 * a Turkish Identification Number (TC Kimlik Numarası). It checks
 * the number's length, first digit, and performs two mathematical
 * checks to verify its validity. The function returns a boolean
 * indicating whether the number is valid or not.
 * @param tcNo - Kontrol edilecek TC Kimlik Numarası
 * @returns TC Numarasının geçerliliği (Boolean)
 *
 * @example
 * ```ts
 * const tcNo = "11111111110"; // Örnek bir sahte TC numarası
 * const isValid = kontrolEt(tcNo);
 * console.log(`TC No geçerli mi? => ${isValid ? "Evet" : "Hayır"}`);
 * ```
 */
export function kontrolEt(tcNo: string): boolean {
  // TC No 11 haneli mi kontrolü
  if (tcNo.length !== 11) return false;

  // İlk hane 0 olmamalı
  if (tcNo.charAt(0) === "0") return false;

  // Her bir haneyi sayıya çeviriyoruz
  const numbers = tcNo.split("").map(Number);

  // İlk 10 hanenin toplamı 11'in katı mı kontrolü
  const sum = numbers.slice(0, 10).reduce((acc, num) => acc + num, 0);
  if (sum % 10 !== numbers[10]) return false;

  // 1, 3, 5, 7 ve 9. hanelerin toplamının 7'ye bölümünden kalan, 10. hane olmalı
  const oddSum = numbers[0] + numbers[2] + numbers[4] + numbers[6] + numbers[8];
  if (
    (oddSum * 7 - numbers[1] - numbers[3] - numbers[5] - numbers[7]) % 10 !==
      numbers[9]
  ) return false;

  return true;
}

if (import.meta.main) {
  const tcNo = "11111111110"; // Örnek bir sahte TC numarası
  const isValid = kontrolEt(tcNo);
  // Sonucu konsola yazdırır
  console.log(`TC No geçerli mi? => ${isValid ? "Evet" : "Hayır"}`);
}
