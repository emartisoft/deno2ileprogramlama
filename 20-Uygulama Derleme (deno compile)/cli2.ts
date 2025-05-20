const name = Deno.args[0] || "Deno!";
console.log(`Merhaba, ${name}!`);
try {
  await Deno.writeTextFile(`merhaba.txt`, `Merhaba, ${name}!`);
  console.log("merhaba.txt dosyasına da yazıldı.");
} catch (err) {
  console.error(err);
}

const names = Deno.readTextFileSync(import.meta.dirname + "/x.txt");
console.log(names);

for (const entry of Deno.readDirSync(import.meta.dirname + "/files")) {
  console.log("Ad:", entry.name);
  console.log("Dosya mı?:", entry.isFile);
  console.log("Klasör mü?:", entry.isDirectory);
  console.log("Sembolik bağlantı mı?:", entry.isSymlink);
  console.log("--------------------------");
}

prompt("Devam etmek için Enter tuşuna basın...");
