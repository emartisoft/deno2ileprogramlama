import { Application } from "@oak/oak";

const app = new Application();
app.use((ctx) => {
  ctx.response.body = "Oak App with Deno!";
});

await app.listen({ port: 8000 });
