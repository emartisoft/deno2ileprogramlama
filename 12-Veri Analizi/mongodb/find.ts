// Veritabanı bağlantısını içe aktarır
import connectMongo from "./db.ts";

async function findMongo() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectMongo();

  try {
    // "Kitaplar" koleksiyonunu seçer
    const collection = db.collection("Kitaplar");

    // Koleksiyondaki tüm belgeleri alır ve konsola tablo olarak yazdırır
    const kitaplar = await collection.find().toArray();
    console.table(kitaplar, ["KitapAdi", "SayfaSayisi"]);

    // "Metres" ile başlayan kitapları bulmak için $regex operatörünü kullanır
    const kitapbul = await collection.find({ KitapAdi: { $regex: "^Metres" } })
      .toArray();

    // Bulunan her bir kitabı for döngüsü ile iterasyon yaparak konsola yazdırır
    for (const kitap of kitapbul) {
      console.log(
        `${kitap.KitapAdi} kitabının sayfa sayısı: ${kitap.SayfaSayisi}`,
      );
    }
  } catch (error) {
    // Hata durumunda hatayı konsola yazdırır
    console.error("Hata:", error);
  } finally {
    // Veritabanı bağlantısını kapatır
    await client.close();
  }
}

// findMongo fonksiyonunu çağırır
findMongo();
