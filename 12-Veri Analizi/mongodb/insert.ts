// Veritabanı bağlantısını içe aktarır
import connectMongo from "./db.ts";

async function insertMongo() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectMongo();

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

  try {
    // Veritabanındaki mevcut koleksiyonları listeler
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    // "Kitaplar" koleksiyonunun mevcut olup olmadığını kontrol eder
    if (!collectionNames.includes("Kitaplar")) {
      console.log("Kitaplar koleksiyonu mevcut değil, oluşturuluyor...");
      // "Kitaplar" koleksiyonunu oluşturur
      await db.createCollection("Kitaplar");
    } else {
      console.log("Kitaplar koleksiyonu mevcut.");
      // Koleksiyon mevcutsa programı sonlandırır
      Deno.exit();
    }

    // "Kitaplar" koleksiyonunu seçer
    const collection = db.collection("Kitaplar");

    // Her bir kitap için döngü başlatır ve veritabanına ekler
    for (const [kitapAdi, sayfaSayisi] of kitaplistesi) {
      await collection.insertOne({
        KitapAdi: kitapAdi,
        SayfaSayisi: sayfaSayisi,
      });
    }

    // Kitapların başarıyla eklendiğini konsola yazdırır
    console.log("Kitaplar koleksiyonuna veriler eklendi.");
  } catch (error) {
    // Hata durumunda hatayı konsola yazdırır
    console.error("Hata:", error);
  } finally {
    // Bağlantıyı kapatır
    await client.close();
  }
}

insertMongo();
