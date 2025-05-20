Deno.serve({ port: 3000, hostname: "127.0.0.1" }, (req) => {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/data") {
    const data = {
      sehir: "Ankara",
      sicaklik: 34,
    };
    const body = JSON.stringify(data);
    const headers = new Headers({ "Content-Type": "application/json" });
    return new Response(body, { status: 200, headers });
  }
  return new Response("Bu siteye ulaşılamıyor", { status: 404 });
});
