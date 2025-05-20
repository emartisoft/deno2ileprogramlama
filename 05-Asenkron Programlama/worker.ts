self.onmessage = (e: MessageEvent) => {
  console.log("Worker konuşuyor, ana iş parçacığından gelen mesaj:", e.data);
  // İşlem sonrası ana iş parçacığına yanıt gönderme:
  self.postMessage({ result: "Mesaj alındı!" });
  self.close(); // İşlem tamamlandığında worker’ı sonlandırabilirsiniz.
};
