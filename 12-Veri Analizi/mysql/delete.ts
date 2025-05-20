// Veritabanı bağlantısını içe aktarır
import clientmysql from "./db.ts";

// Kitaplar tablosundaki id'si 7 olan kitabı siler
await clientmysql.execute(`DELETE FROM Kitaplar WHERE ?? = ?`, ["ID", 7]);
console.log("Kitap silindi.");

// Veritabanı bağlantısını kapatır
await clientmysql.close();
