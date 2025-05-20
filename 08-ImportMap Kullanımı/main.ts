import { blue, green, red } from "colors";
import yargs from "yargs";
import { Argv } from "yargs";

const _argv = yargs(Deno.args)
  .command(
    "merhaba [ad]",
    "isme göre selamlama yapar",
    (yargs: Argv) => {
      return yargs.positional("ad", {
        describe: "selamlanacak isim",
        default: "Deno",
      });
    },
    (args: { ad: string }) => {
      console.log(green(`Hey! Merhaba, ${args.ad}!`));
    },
  )
  .command(
    "renkli [mesaj]",
    "Farklı renklerde mesaj yazdırır",
    (yargs: Argv) => {
      return yargs.positional("mesaj", {
        describe: "renkli mesaj",
        default: "Bu bir renkli mesajdır!",
      });
    },
    (args: { mesaj: string }) => {
      console.log(red(args.mesaj));
      console.log(green(args.mesaj));
      console.log(blue(args.mesaj));
    },
  )
  .help()
  .version("1.0.0")
  .parse();
