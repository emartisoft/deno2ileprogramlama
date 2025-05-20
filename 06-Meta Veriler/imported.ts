import { Application } from "@oak/oak";

if (import.meta.main) {
  const app = new Application();
  app.use((ctx) => {
    // import.meta.resolve() fonksiyonu ile modülün yolu alınabilir.
    ctx.response.body = "Oak modülün yolu: " + import.meta.resolve("@oak/oak");
  });
  app.listen({ port: 8000 });
}
