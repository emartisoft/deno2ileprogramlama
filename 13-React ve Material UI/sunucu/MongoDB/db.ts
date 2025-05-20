// MongoClient sınıfını içe aktarır
import { MongoClient } from "https://deno.land/x/mongo@v0.33.0/mod.ts";
import "jsr:@std/dotenv/load"; // .env dosyasını yükler

// Veritabanı bağlantısı için gerekli bilgileri tanımlar
const host = Deno.env.get("HOSTMONGO");
const database = Deno.env.get("DATABASEMONGO");
const port: number = Number(Deno.env.get("MONGODB_PORT"));
const username = Deno.env.get("USERMONGO");
const password = Deno.env.get("PASSWORDMONGO");

// MongoDB sunucusuna bağlanan fonksiyonu tanımlar
async function connectMongo() {
  // MongoClient nesnesini oluşturur
  const client = new MongoClient();
  // MongoDB sunucusuna bağlanır
  await client.connect({
    db: database, // Veritabanı adını belirtir
    tls: false, // Eğer TLS kullanıyorsanız true yapın
    servers: [
      {
        host: host, // Sunucu adresini belirtir
        port: port, // Sunucu portunu belirtir
      },
    ],
    credential: {
      username: username, // Kullanıcı adını belirtir
      password: password, // Şifreyi belirtir
      db: database, // Kimlik doğrulama için kullanılan veritabanı
      mechanism: "SCRAM-SHA-1", // Kullanılan doğrulama yöntemi
    },
  });

  // Veritabanı referansını alır
  const db = client.database(database);
  return { db, client };
}

// Veritabanı ve client nesnelerini dışa aktarır
export default connectMongo;
