Deno.serve(
  { port: 3000, hostname: "127.0.0.1" },
  (_req) => new Response("Merhaba Deno!"),
);
