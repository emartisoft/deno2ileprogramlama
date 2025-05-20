async function main(): Promise<void> {
  try {
    // fetch() fonksiyonunu kullanarak verilerin alınmasını sağlar.
    const response = await fetch("https://docs.deno.com/api/web/fetch");
    // Yanıt verisinin text biçimine dönüştürülmesini sağlar.
    const text = await response.text();
    // Yanıt verisinin ilk 500 karakterini konsola yazdırır.
    console.log(text.slice(0, 500));
  } catch (err) {
    // Hata oluşursa hata mesajını konsola yazdırır.
    console.error(err);
  }
}
// Programın ana fonksiyonunu cagırır.
main();
