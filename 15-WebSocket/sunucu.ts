Deno.serve((req) => {
  // İstek başlıklarında "upgrade" değeri "websocket" değilse, 501 yanıtı döndür
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("WebSocket bağlantısı bekleniyor", { status: 501 });
  }

  // İsteği WebSocket bağlantısına yükselt
  const { socket, response } = Deno.upgradeWebSocket(req);

  // WebSocket bağlantısı açıldığında
  socket.onopen = () => {
    console.log("Bir istemci bağlandı.");
  };

  // İstemciden mesaj alındığında
  socket.onmessage = (event) => {
    console.log(`Alınan mesaj: ${event.data}`);
    if (event.data === "Bond") {
      socket.send("James Bond");
    }
  };

  // WebSocket bağlantısı kapandığında
  socket.onclose = () => {
    console.log("İstemci bağlantısı kapandı.");
  };

  // WebSocket bağlantısında hata oluştuğunda
  socket.onerror = (error) => {
    console.error("WebSocket hatası:", error);
  };

  return response;
});
