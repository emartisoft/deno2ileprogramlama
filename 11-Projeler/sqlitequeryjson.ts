import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("./db/chinook.db");
const sorgu =
  "SELECT CustomerId, FirstName, LastName FROM customers ORDER BY FirstName LIMIT 10;";
const sonuc = db.query(sorgu);
const sutunlar = ["ID", "Ad", "Soyad"];

const jsonSonuc = [];
for (const satir of sonuc) {
  const nesne: { [key: string]: any } = {};
  sutunlar.forEach((sutun, index) => {
    nesne[sutun] = satir[index];
  });
  jsonSonuc.push(nesne);
}

console.log(JSON.stringify(jsonSonuc, null, 2));
console.table(jsonSonuc, sutunlar);
db.close();
