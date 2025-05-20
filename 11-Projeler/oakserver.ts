import { Application, Router, send } from "@oak/oak";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const app = new Application();
const router = new Router();
const db = new DB("./db/chinook.db");

router.get("/musteriler", (ctx) => {
  const data = [];
  for (
    const [CustomerId, FirstName, LastName] of db.query(
      "SELECT CustomerId, FirstName, LastName FROM customers",
    )
  ) {
    data.push({ CustomerId, FirstName, LastName });
  }
  ctx.response.body = data;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}`,
    index: "index.html",
  });
});

console.log("Server running on http://localhost:9000");
await app.listen({ port: 9000 });
