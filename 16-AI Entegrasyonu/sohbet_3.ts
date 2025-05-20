import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

(async () => {
  const brailleSpinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let index = 0;
  const spinner = setInterval(() => {
    Deno.stdout.write(
      new TextEncoder().encode(
        `\r  Düşünüyorum ${brailleSpinner[index % brailleSpinner.length]}\r`,
      ),
    );
    index++;
  }, 100);

  try {
    const result = await model.generateContent([
      Deno.args[0] ||
      "Güneş Sistemi'nin kaç gezegeni vardır? Bilgi verir misin?",
    ]);
    clearInterval(spinner);
    Deno.stdout.write(new TextEncoder().encode("\r"));

    console.log(renderMarkdown(wrapAnsi(result.response.text(), 100)));
  } catch (error) {
    clearInterval(spinner);
    Deno.stdout.write(new TextEncoder().encode("\r"));
    console.error(error);
  }
})();
