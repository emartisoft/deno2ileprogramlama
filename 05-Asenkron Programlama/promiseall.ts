const files = ["file.txt", "file2.txt", "file3.txt"];
const promises = files.map((file) => Deno.readTextFile(file));
// Dosyaları paralel olarak okuyun
const results = await Promise.all(promises);
console.log(results);
