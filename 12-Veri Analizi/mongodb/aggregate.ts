// Veritabanı bağlantısını içe aktarır
import connectMongo from "./db.ts";

async function aggregateMongo() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectMongo();

  try {
    // "Kitaplar" koleksiyonunu seçer
    const collection = db.collection("Kitaplar");

    // Aggregation kullanarak "SayfaSayisi" alanı için toplam sayfa sayısını bulur
    const toplamSayfaSayisi = await collection.aggregate([
      {
        $group: {
          _id: null, // Gruplama anahtarı, burada tüm belgeleri tek bir grup olarak ele alıyoruz
          toplamSayfaSayisi: { $sum: "$SayfaSayisi" }, // "SayfaSayisi" alanının toplamını hesaplar
        },
      },
    ]).toArray();

    // Toplam sayfa sayısını konsola yazdırır
    console.log("Toplam Sayfa Sayısı:", toplamSayfaSayisi[0].toplamSayfaSayisi);
  } catch (error) {
    // Hata durumunda hatayı konsola yazdırır
    console.error("Hata:", error);
  } finally {
    // Veritabanı bağlantısını kapatır
    await client.close();
  }
}

// aggregateMongo fonksiyonunu çağırır
aggregateMongo();
