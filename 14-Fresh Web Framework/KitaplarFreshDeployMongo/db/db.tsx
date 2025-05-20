import { MongoClient } from "https://deno.land/x/mongo@v0.33.0/mod.ts";
import "jsr:@std/dotenv/load"; // .env dosyasını yükler

// Veritabanı bağlantısı için gerekli bilgileri tanımlar
const hostname = Deno.env.get("HOST");
const database = Deno.env.get("DATABASE");
const mongoport: number = Number(Deno.env.get("MONGO_PORT"));
const user = Deno.env.get("USER");
const password = Deno.env.get("PASSWORD");

/**
 * MongoDB sunucusuna bağlanmak için kullanılan fonksiyondur.
 *
 * Bu fonksiyon, MongoClient oluşturur ve veritabanına bağlanmak için
 * gerekli bilgileri alır.
 *
 * Bağlantınızın başarılı olması durumunda, MongoClient nesnesini döndürür.
 * Bağlantı başarısız olursa, undefined döndürür.
 *
 * @returns {MongoClient | undefined} MongoClient nesnesi
 */
export const connectDb = async (): Promise<MongoClient | undefined> => {
  try {
    // MongoClient nesnesini oluşturur
    const clientmongo = new MongoClient();
    // MongoDB sunucusuna bağlanır
    await clientmongo.connect({
      db: database, // Veritabanı adını belirtir
      tls: false, // Eğer TLS kullanıyorsanız true yapın
      servers: [
        {
          host: hostname, // Sunucu adresini belirtir
          port: mongoport, // Sunucu portunu belirtir
        },
      ],
      credential: {
        username: user, // Kullanıcı adını belirtir
        password: password, // Şifreyi belirtir
        db: database, // Kimlik doğrulama için kullanılan veritabanı
        mechanism: "SCRAM-SHA-1", // Kullanılan doğrulama yöntemi
      },
    });

    return clientmongo;
  } catch (_error) {
    console.error("Hata: Bağlantı kurulamadı"); //, error);
  }
};

/**
 * MongoDB'de depolanan kitap bilgilerini alır ve yanıt olarak döner.
 *
 * Bu fonksiyon, MongoClient nesnesini alır ve veritabanında
 * Kitaplar isimli koleksiyonundan tüm belgeleri alır.
 *
 * Belgelerin alınması başarılı olursa, belgelerin bir dizi olarak
 * yanıt olarak döner. Belgelerin alınması başarısız olursa, hata
 * mesajını konsola yazar ve boş bir dizi döner.
 *
 * @param {MongoClient} clientmongo MongoDB bağlantısı için kullanılan MongoClient nesnesi
 * @returns {Promise<{KitapAdi: string; SayfaSayisi: number}[]>} Kitap bilgilerinin bir dizi olarak döner
 */
export const getBooks = async (clientmongo: MongoClient) => {
  let results = [{ KitapAdi: "Veri Alınamadı", SayfaSayisi: 0 }];
  try {
    const db = clientmongo.database(database);
    const collection = db.collection("Kitaplar");

    // Koleksiyondaki tüm belgeleri alır ve konsola tablo olarak yazdırır
    results = await collection.find().toArray() as {
      KitapAdi: string;
      SayfaSayisi: number;
    }[];
  } catch (_error) {
    console.error("Hata: Tablodan veri çekilemedi"); //, error);
  }

  // Sorgu sonuçlarını yanıt olarak döner
  return results;
};
