import { kontrolEt } from "@emarti/tckontrol";

const tcNo = "11111111110"; // Örnek bir sahte TC numarası
const isValid = kontrolEt(tcNo);
// Sonucu konsola yazdırır
console.log(`TC No geçerli mi? => ${isValid ? "Evet" : "Hayır"}`);
