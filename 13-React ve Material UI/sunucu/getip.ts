// Yerel ağdaki IP adreslerini bulma fonksiyonu
export function getLocalIP(): string[] {
  // Ağ arayüzlerini alır
  const interfaces = Deno.networkInterfaces();
  // Yerel IP adreslerini saklamak için bir dizi oluşturur
  const localIPs: string[] = [];

  // Her bir ağ arayüzünü döngü ile gezer
  for (const iface of interfaces) {
    // IPv4 ailesine ait ve 127. ile başlamayan adresleri kontrol eder
    if (iface.family === "IPv4" && !iface.address.startsWith("127.")) {
      // Uygun adresleri localIPs dizisine ekler
      localIPs.push(iface.address);
    }
  }

  // Eğer localIPs dizisi boş değilse, diziyi döner; aksi takdirde "Yerel IP bulunamadı" mesajını döner
  return localIPs.length > 0 ? localIPs : ["Yerel IP bulunamadı"];
}
