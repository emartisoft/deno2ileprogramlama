// Veritabanı bağlantısını içe aktarır
import connectMongo from "./db.ts";

async function version() {
  // Veritabanı ve istemci bağlantılarını alır
  const { db, client } = await connectMongo();

  try {
    // buildInfo komutunu çalıştırarak sürümü öğren
    const buildInfo = await db.runCommand({ buildInfo: 1 });

    // Sürüm bilgisini yazdır
    console.log("MongoDB Sürümü:", buildInfo.version);
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    // Bağlantıyı kapat
    await client.close();
  }
}

version();
