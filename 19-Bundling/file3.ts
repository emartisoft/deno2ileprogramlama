import { greet } from "./file1.ts";
import { add } from "./file2.ts";

const name = "Deno";
const result = add(5, 3);

console.log(greet(name));
console.log(`Sum: ${result}`);
