// deno run --allow-ffi adder.ts
const libName = {
  windows: "./adder.dll",
  linux: "./libadder.so",
  darwin: "./libadder.dylib",
}[Deno.build.os];

const lib = Deno.dlopen(libName, {
  add: { parameters: ["i32", "i32"], result: "i32" },
});

const a = 5;
const b = 3;

const result = lib.symbols.add(a, b);
console.log(`Sonuç: ${a} + ${b} = ${result}`);

lib.close();
