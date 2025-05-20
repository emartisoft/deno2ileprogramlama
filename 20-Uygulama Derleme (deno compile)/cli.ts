const name = Deno.args[0] || "Deno!";
console.log(`Merhaba, ${name}!`);
try {
  await Deno.writeTextFile(`merhaba.txt`, `Merhaba, ${name}!`);
  console.log("merhaba.txt dosyasına da yazıldı.");
} catch (err) {
  console.error(err);
}
prompt("Devam etmek için Enter tuşuna basın...");
