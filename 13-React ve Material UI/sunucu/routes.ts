// Oak framework'ünden Router'ı içe aktarır
import { Router } from "@oak/oak";

// Controller dosyasından gerekli fonksiyonları içe aktarır
import {
  getKitaplarFromMongodb,
  getKitaplarFromMysql,
  info,
} from "./controller.ts";

// Yeni bir Router oluşturur
const router = new Router();

// Root endpoint'ine gelen GET isteklerini info fonksiyonu ile işler
router
  .get("/", info) // Ana sayfa veya bilgi endpoint'i
  // "/mysqldata" endpoint'ine gelen GET isteklerini getKitaplarFromMysql fonksiyonu ile işler
  .get("/mysqldata", getKitaplarFromMysql) // MySQL veritabanından kitap verilerini alır
  // "/mongodata" endpoint'ine gelen GET isteklerini getKitaplarFromMongodb fonksiyonu ile işler
  .get("/mongodata", getKitaplarFromMongodb); // MongoDB veritabanından kitap verilerini alır

// Router'ı dışa aktarır
export default router;
