// MySQL modülünden Client sınıfını içe aktarır
import { Client } from "https://deno.land/x/mysql/mod.ts";
import "jsr:@std/dotenv/load"; // .env dosyasını yükler

// Veritabanı bağlantısı için gerekli bilgileri tanımlar
const host = Deno.env.get("HOST");
const database = Deno.env.get("DATABASE");
const mysqlport: number = Number(Deno.env.get("MYSQL_PORT"));
const user = Deno.env.get("USER");
const password = Deno.env.get("PASSWORD");

// MySQL veritabanına bağlanmak için yeni bir Client örneği oluşturur ve bağlanır
const clientmysql = await new Client().connect({
  hostname: host, // Veritabanı sunucusunun adresi
  username: user, // Veritabanı kullanıcı adı
  password: password, // Veritabanı kullanıcı şifresi
  db: database, // Bağlanılacak veritabanı adı
  port: mysqlport, // Veritabanı sunucusunun port numarası
});

// Bağlantıyı dışa aktarır, böylece diğer dosyalarda kullanılabilir
export default clientmysql;
