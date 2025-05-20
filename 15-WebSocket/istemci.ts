// ws adında yeni bir WebSocket nesnesi oluşturuyor ve sunucuya bağlanıyoruz
const ws = new WebSocket("ws://localhost:8000");

// Bağlantı başarıyla kurulduğunda tetiklenen olay
ws.onopen = () => {
  console.log("Sunucuya bağlanıldı."); // Bağlantı başarılı mesajı
  ws.send("Bond"); // Sunucuya 'Bond' mesajı gönder
};

// Sunucudan mesaj alındığında tetiklenen olay
ws.onmessage = (event) => {
  console.log(`Sunucudan gelen mesaj: ${event.data}`); // Gelen mesajı konsola yazdır
  if (event.data === "James Bond") {
    console.log("Sunucudan 'James Bond' yanıtı alındı.");
  }
};

// Hata oluştuğunda tetiklenen olay
ws.onerror = (error) => {
  if (error instanceof ErrorEvent) {
    console.error(`WebSocket hatası: ${error.message}`); // Hata mesajını konsola yazdır
  } else {
    console.error("Unknown error");
  }
};

// Bağlantı kapandığında tetiklenen olay
ws.onclose = () => {
  console.log("Bağlantı kapatıldı."); // Bağlantı kapandı mesajı
};
