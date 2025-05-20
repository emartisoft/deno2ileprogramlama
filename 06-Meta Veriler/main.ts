import { someFunction } from "./helper.ts";

console.log("Ana modül URL:", Deno.mainModule);
console.log("Ana modül mü?:", import.meta.main);

someFunction();
