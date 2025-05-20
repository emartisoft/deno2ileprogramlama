self.onmessage = (e: MessageEvent) => {
  const { numbers } = e.data as { numbers: number[] };
  // Uzun sürebilecek bir hesaplama: sayılar dizisinin toplamı
  const sum = numbers.reduce((acc, num) => acc + num, 0);

  // Hesaplama sonucu ana iş parçacığına gönderiliyor.
  self.postMessage(sum);
  self.close(); // İşlem tamamlandıktan sonra worker kapatılır.
};
