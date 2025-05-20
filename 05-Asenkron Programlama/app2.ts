if (import.meta.main) {
  // CLI argümanlarını al ve sayıya dönüştür
  const numbers = Deno.args.map((arg) => Number(arg));
  if (numbers.length === 0 || numbers.some(isNaN)) {
    console.log(
      "Usage: deno run --allow-read --unstable-worker-options app2.ts <number1> <number2> ...",
    );
    Deno.exit(1);
  }

  // Worker dosyasının URL'sini oluşturuyoruz.
  const workerUrl = new URL("./worker2.ts", import.meta.url).href;
  const worker = new Worker(workerUrl, {
    type: "module",
    // Worker'ın Deno API'lerine erişimi için izinleri ana iş parçacığından devralıyoruz.
    deno: { permissions: "inherit" },
  });

  // Worker'dan gelen mesajı dinleyelim.
  worker.onmessage = (e: MessageEvent) => {
    console.log("Worker'dan gelen sonuç:", e.data);
    worker.terminate(); // İşlem tamamlandığında worker'ı sonlandır.
  };

  // Worker'a sayılar dizisini gönderiyoruz.
  worker.postMessage({ numbers });
}
