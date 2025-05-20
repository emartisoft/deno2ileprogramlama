// Veritabanı bağlantısını içe aktarır
import clientmysql from "./db.ts";

// "Kitaplar" tablosunu oluşturur
await clientmysql.execute(
  "\
    CREATE TABLE IF NOT EXISTS `Kitaplar` ( \
        `ID` INT AUTO_INCREMENT NOT NULL, \
        `KitapAdi` VARCHAR(250) NOT NULL, \
        `SayfaSayisi` INT NOT NULL, \
        CONSTRAINT `PRIMARY` PRIMARY KEY (`ID`) \
    ); \
  ",
);
console.log("Kitaplar tablosu oluşturuldu.");

// Tablodaki verilerin hepsini siler
await clientmysql.execute("TRUNCATE TABLE `Kitaplar`");

// Tabloya yeni veriler ekler
const insert: string =
  "INSERT INTO `Kitaplar` (`KitapAdi`, `SayfaSayisi`) VALUES ";

// Eklenecek kitapların adlarını ve sayfa sayılarını içeren bir dizi tanımlar
const kitaplistesi = [
  ["Mor Salkımlı Sokak", 245],
  ["Mahkum", 323],
  ["Acıların Hükümdarı", 299],
  ["Seni Kaybedemem", 211],
  ["Metres 1", 345],
  ["Metres 2", 299],
  ["Bir Kibritle Yok Olmak", 189],
];

// Her bir kitap için döngü başlatır ve veritabanına ekler
for (const [kitapAdi, sayfaSayisi] of kitaplistesi) {
  await clientmysql.execute(`${insert}('${kitapAdi}', ${sayfaSayisi})`);
}

// Kitapların başarıyla eklendiğini konsola yazdırır
console.log("Kitaplar tablosuna veriler eklendi.");

// Veritabanı bağlantısını kapatır
await clientmysql.close();
