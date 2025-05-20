// Veritabanı bağlantısını içe aktarır
import clientmysql from "./db.ts";

// MySQL veritabanının sürümünü sorgular ve sonucu alır
const version = await clientmysql.query("SELECT VERSION()");

// Sorgu sonucu varsa, MySQL sürümünü konsola yazdırır
version && console.log("MySQL Sürümü " + version[0]?.["VERSION()"]);

// Veritabanı bağlantısını kapatır
await clientmysql.close();
