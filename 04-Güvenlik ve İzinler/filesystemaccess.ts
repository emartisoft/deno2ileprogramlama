// 'input.txt' dosyasını oku
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("input.txt");
const text = decoder.decode(data);
console.log("Dosyadan okunan veri:", text);

// 'output.txt' dosyasına yaz
const encoder = new TextEncoder();
const newText = text.toUpperCase();
const newData = encoder.encode(newText);
await Deno.writeFile("output.txt", newData);
console.log("Veri 'output.txt' dosyasına yazıldı.");
