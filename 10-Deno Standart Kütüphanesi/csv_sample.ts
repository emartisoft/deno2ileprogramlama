// Deno'nun standart kütüphanesinden CSV ayrıştırma modülünü import edilir
import { parse } from "@std/csv";

interface LogEntry {
  ID: string;
  "istemci IP": string;
  zaman: string;
}

async function findMaxClientCSV() {
  // CSV dosyasını metin olarak oku
  const fileContent = await Deno.readTextFile("./data.csv");

  // CSV dosyasını parse ederek bir diziye dönüştür
  const parsedData = await parse(fileContent, {
    columns: ["ID", "istemci IP", "zaman"],
  }) as Record<string, string>[];
  const data: LogEntry[] = parsedData.map((entry) => ({
    ID: entry.ID,
    "istemci IP": entry["istemci IP"],
    zaman: entry.zaman,
  }));

  // Her bir istemci IP'sinin istek sayısını tutacak bir Map oluştur
  const counts = new Map<string, number>();

  for (const entry of data) {
    const ip = entry["istemci IP"];
    counts.set(ip, (counts.get(ip) || 0) + 1);
  }

  // En fazla istekte bulunan istemciyi bulma
  let maxIP = "";
  let maxCount = 0;
  for (const [ip, count] of counts.entries()) {
    if (count > maxCount) {
      maxIP = ip;
      maxCount = count;
    }
  }

  console.log(`En fazla istek yapan istemci: ${maxIP} (${maxCount} istek)`);
}

findMaxClientCSV();
