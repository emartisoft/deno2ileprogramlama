// Veritabanı bağlantısını içe aktarır
import connectToDatabase from "./db.ts";

async function replaceMongo() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectToDatabase();

  try {
    // "Kitaplar" koleksiyonunu seçer
    const collection = db.collection("Kitaplar");

    // "Metres 2" adlı kitabı, yeni verilerle değiştirir
    await collection.replaceOne(
      { KitapAdi: "Metres 2" }, // Değiştirilecek belgenin kriteri
      {
        KitapAdi: "Tutsak Gelin 2", // Yeni kitap adı
        SayfaSayisi: 777, // Yeni sayfa sayısı
      },
    );

    // Değiştirme işleminin başarılı olduğunu konsola yazdırır
    console.log("Değiştirme başarılı");
  } catch (error) {
    // Hata durumunda hatayı konsola yazdırır
    console.error("Hata:", error);
  } finally {
    // Veritabanı bağlantısını kapatır
    await client.close();
  }
}

// Ana fonksiyonu çalıştır
replaceMongo();
