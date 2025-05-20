const workerUrl = new URL("./worker.ts", import.meta.url).href;
const worker = new Worker(workerUrl, {
  type: "module",
});

worker.postMessage({ message: "Merhaba worker!" });

worker.onmessage = (e: MessageEvent) => {
  console.log("Ana iş parçacığı konuşuyor, worker’dan gelen mesaj:", e.data);
};
