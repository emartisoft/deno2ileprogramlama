// url
console.log("%cimport.meta.url", "color: green");
console.log(import.meta.url);

// main
console.log("%cimport.meta.main", "color: green");
if (import.meta.main) {
  console.log("Bu modül ana modül olarak çalıştırıldı.");
}

// resolve
console.log("%cimport.meta.resolve", "color: green");
console.log(import.meta.resolve("./test.ts"));

// filename
console.log("%cimport.meta.filename", "color: green");
console.log("Dosya adı:", import.meta.filename);

// dirname
console.log("%cimport.meta.dirname", "color: green");
console.log("Dizin yolu:", import.meta.dirname);

// url üzerinden basename ve dirname bulma
console.log("%cURL üzerinden basename ve dirname bulma", "color: green");
const url = new URL(import.meta.url);
const path = url.pathname;
const basename = path.split("/").pop(); // Dosya adı, örneğin "file.ts"
const dir = path.substring(0, path.lastIndexOf("/")); // Dizin yolu, örneğin "/path/to"
console.log(basename, dir);
