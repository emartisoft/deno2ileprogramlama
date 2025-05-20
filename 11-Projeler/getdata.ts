import { DB } from "https://deno.land/x/sqlite/mod.ts";

export function veritabanindanVeriGetir(): Array<{ [key: string]: any }> {
  const db = new DB("./db/chinook.db");
  const sorgu = "SELECT CustomerId, FirstName, LastName FROM customers;";
  const sonuc = db.query(sorgu);
  const sutunlar = ["ID", "Ad", "Soyad"];
  // Sonuçları JSON formatına dönüştür
  const jsonSonuc: Array<{ [key: string]: any }> = [];
  for (const satir of sonuc) {
    const nesne: { [key: string]: any } = {};
    sutunlar.forEach((sutun, index) => {
      nesne[sutun] = satir[index];
    });
    jsonSonuc.push(nesne);
  }
  db.close();
  return jsonSonuc;
}

export default veritabanindanVeriGetir;
