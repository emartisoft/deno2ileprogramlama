import { downloadFile } from "./downloadfile.ts";
import { decompress } from "jsr:@fakoua/zip-ts@^1.3.1";

const zipfile: string = "https://www.sqlitetutorial.net/" +
  "wp-content/uploads/2018/03/chinook.zip";
const dbfile: string = "./db/database.zip";

try {
  await Deno.mkdir("./db", { recursive: true });
  await downloadFile(zipfile, dbfile);
  const _dosyaBilgisi = Deno.statSync(dbfile);
  console.log("File downloaded");
  await decompress(dbfile, "./db");
  console.log("File extracted");
} catch (_error) {
  console.log("File not downloaded/extracted");
  Deno.exit(1);
}

console.log("Ok.");
