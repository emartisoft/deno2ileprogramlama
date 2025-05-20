// Veritabanı bağlantısını içe aktarır
import clientmysql from "./db.ts";

// Kitaplar tablosundaki id'si 5 olan kitabın adını 'Metres' olarak günceller
await clientmysql.execute(
  `UPDATE Kitaplar SET KitapAdi = 'Metres' WHERE ID = 5`,
);
console.log("Kitap adı güncellendi.");

// Kitaplar tablosundaki id'si 7 olan kitabın sayfa sayısını 666 olarak günceller
await clientmysql.execute(`UPDATE Kitaplar SET ?? = ? WHERE ID = 7`, [
  "SayfaSayisi",
  666,
]);
console.log("Kitap sayfa sayısı güncellendi.");

// Veritabanı bağlantısını kapatır
await clientmysql.close();
