import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

const result = await model.generateContent([
  "Güneş Sistemi'nin kaç gezegeni vardır? Bilgi verir misin?",
]);
console.log(renderMarkdown(wrapAnsi(result.response.text(), 100)));
