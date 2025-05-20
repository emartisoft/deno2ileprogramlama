import {
  convert_hex_to_string,
  convert_string_to_hex,
} from "./lib/hexstring.js";
// Convert string to hex
console.log(convert_string_to_hex("Deno is great!"));
// Convert hex to string
console.log(convert_hex_to_string("44656e6f20697320677265617421"));
