// Veritabanı bağlantısını içe aktarır
import connectToDatabase from "./db.ts";

async function deleteMongo() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectToDatabase();

  try {
    // "Kitaplar" koleksiyonunu seçer
    const collection = db.collection("Kitaplar");

    // "Metres 1" adlı kitabı siler
    await collection.deleteOne({ KitapAdi: "Metres 1" });

    // "Metres 2" adlı tüm kitapları siler
    await collection.deleteMany({ KitapAdi: "Metres 2" });

    // Silme işlemlerinin başarılı olduğunu konsola yazdırır
    console.log("Silme işlemleri başarılı");
  } catch (error) {
    // Hata durumunda hatayı konsola yazdırır
    console.error("Hata:", error);
  } finally {
    // Veritabanı bağlantısını kapatır
    await client.close();
  }
}

// Ana fonksiyonu çalıştır
deleteMongo();
