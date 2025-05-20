const workerCount = 3;
const workers: Worker[] = [];
const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // İşlem yapılacak görevler

// Worker'ları oluştur
for (let i = 0; i < workerCount; i++) {
  // Worker'ı oluşturuyoruz.
  const worker = new Worker(new URL("./worker3.ts", import.meta.url).href, {
    type: "module",
    deno: { permissions: "inherit" },
  });

  // Worker'dan gelen mesajı dinler. Mesaj, worker'da
  // tamamlanan bir görevin sonucu olacaktır. Bu sonucu
  // konsola yazar ve bir sonraki görevi atanır.
  worker.onmessage = (e) => {
    console.log(`Worker ${i} sonucu:`, e.data);
    assignTask(worker);
  };

  // Worker'da bir hata oluştuğunda, hata mesajını
  // konsola yazar ve worker'ı sonlandırır.
  worker.onerror = (e) => {
    console.error(`Worker ${i} hatası:`, e.message);
    worker.terminate();
  };

  // Worker'ı diziye ekle
  workers.push(worker);
}

// Görev atama fonksiyonu
function assignTask(worker: Worker) {
  if (tasks.length > 0) {
    // Görev listesinden bir görev al ve worker'a gönder
    const task = tasks.shift();
    worker.postMessage(task);
  } else {
    // Görev listesi boşsa worker'ı sonlandır
    worker.terminate();
  }
}

// İlk görevleri atama
workers.forEach(assignTask);
