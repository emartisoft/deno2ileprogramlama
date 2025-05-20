export function someFunction() {
  console.log("Yardımcı modül URL:", import.meta.url);
  console.log("Ana modül mü?:", import.meta.main);
  console.log("Ana modül URL'si yardımcıdan:", Deno.mainModule);
}
