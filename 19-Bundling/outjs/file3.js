// file1.ts
var greet = (name2) => {
  return `Hello, ${name2}!`;
};

// file2.ts
var add = (a, b) => {
  return a + b;
};

// file3.ts
var name = "Deno";
var result = add(5, 3);
console.log(greet(name));
console.log(`Sum: ${result}`);
