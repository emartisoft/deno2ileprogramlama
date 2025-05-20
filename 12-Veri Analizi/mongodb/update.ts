// Veritabanı bağlantısını içe aktarır
import connectMongo from "./db.ts";

async function updateMongo() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectMongo();

  try {
    // "Kitaplar" koleksiyonunu seçer
    const collection = db.collection("Kitaplar");

    // Koleksiyondaki belgeyi günceller
    await collection.updateOne(
      { KitapAdi: "Metres 1" }, // Güncellenecek belgenin kriteri
      { $set: { KitapAdi: "Tutsak Gelin 1" } }, // Güncelleme işlemi
    );
    console.log("Güncelleme başarılı");
  } catch (error) {
    // Hata durumunda hatayı konsola yazdırır
    console.error("Hata:", error);
  } finally {
    // Veritabanı bağlantısını kapatır
    await client.close();
  }
}

// updateMongo fonksiyonunu çağırır
updateMongo();
