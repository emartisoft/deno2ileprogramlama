import { WebUI } from "https://deno.land/x/webui/mod.ts";

const pencere = new WebUI();
pencere.show("index.html");
pencere.navigate("http://localhost:9000");
await WebUI.wait();
