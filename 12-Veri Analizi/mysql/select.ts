// Veritabanı bağlantısını içe aktarır
import clientmysql from "./db.ts";

// "Kitaplar" tablosundaki tüm kayıtları seçen bir sorgu çalıştırır
const result = await clientmysql.query("SELECT * FROM `Kitaplar`");

// Sorgu sonucunu konsola yazdırır
console.log(result);

// Sorgu sonucunu tablo formatında konsola yazdırır
console.table(result);

// Veritabanı bağlantısını kapatır
await clientmysql.close();
