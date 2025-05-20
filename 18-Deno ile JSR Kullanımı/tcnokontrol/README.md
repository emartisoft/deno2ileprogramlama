# tckontrol

TC Kimlik Numarası doğrulama fonksiyonu

## what does it do?

This is a TypeScript function named kontrolEt that validates a Turkish
Identification Number (TC Kimlik Numarası). It checks the number's length, first
digit, and performs two mathematical checks to verify its validity. The function
returns a boolean indicating whether the number is valid or not.

## usage

```console
deno add jsr:@emarti/tckontrol
```

sample.ts

```ts
import { kontrolEt } from "@emarti/tckontrol";

const tcNo = "11111111110"; // Örnek bir sahte TC numarası
const isValid = kontrolEt(tcNo);
// Sonucu konsola yazdırır
console.log(`TC No geçerli mi? => ${isValid ? "Evet" : "Hayır"}`);
```

```console
deno run sample.ts
```
