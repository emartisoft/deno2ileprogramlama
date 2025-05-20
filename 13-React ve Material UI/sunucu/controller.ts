// Oak framework'ünden Context'i içe aktarır
import { Context } from "@oak/oak";
// MySQL veritabanı bağlantısını içe aktarır
import clientmysql from "./MySQL/db.ts";
// MongoDB veritabanı bağlantısını içe aktarır
import connectMongo from "./MongoDB/db.ts";

// Root endpoint'ine gelen GET isteklerini işler ve bilgi mesajı döner
export const info = (context: Context) => {
  context.response.body =
    "Veritabanlarından veri almak için kullanılan endpointler:\n" +
    "MySQL  :    /mysqldata\n" +
    "MongoDB:    /mongodata";
};

// "/mysqldata" endpoint'ine gelen GET isteklerini işler
export const getKitaplarFromMysql = async (context: Context) => {
  // MySQL veritabanından tüm verileri seçer
  //const [results, _fields] = await clientmysql.query("SELECT * FROM Kitaplar"); / mysql2 için
  const results = await clientmysql.query("SELECT * FROM Kitaplar");

  // Sorgu sonuçlarını yanıt olarak döner
  context.response.body = results;
  // Veritabanı bağlantısını kapatır
  //await clientmysql.end();
};

// "/mongodata" endpoint'ine gelen GET isteklerini işler
export const getKitaplarFromMongodb = async (context: Context) => {
  // MongoDB'ye bağlanır
  const { db, clientmongo } = await connectMongo();
  // "Kitaplar" koleksiyonunu seçer
  const collection = db.collection("Kitaplar");
  // Koleksiyondaki tüm belgeleri alır
  const results = await collection.find().toArray();
  // Sorgu sonuçlarını yanıt olarak döner
  context.response.body = results;
  // MongoDB bağlantısını kapatır
  //clientmongo.close();
};
