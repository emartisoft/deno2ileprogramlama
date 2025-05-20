// Veritabanı bağlantısını içe aktarır
import connectMongo from "./db.ts";

async function countMongo() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectMongo();

  // "Kitaplar" koleksiyonunu seçer
  const collection = db.collection("Kitaplar");

  // Koleksiyondaki toplam belge sayısını alır ve konsola yazdırır
  const belgeSayisi = await collection.countDocuments();
  console.log(`Toplam belge sayısı: ${belgeSayisi}`);

  // "SayfaSayisi" alanı 299 olan belgelerin sayısını alır ve konsola yazdırır
  const belgeSayisi2 = await collection.countDocuments({ SayfaSayisi: 299 });
  console.log(`Toplam sayfası 299 olan kitap sayısı: ${belgeSayisi2}`);

  // Veritabanı bağlantısını kapatır
  await client.close();
}

countMongo();
