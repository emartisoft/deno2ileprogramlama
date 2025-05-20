Deno.readTextFile("./file.txt")
  .then((data) => {
    console.log("Dosya içeriği:\n", data);
  })
  .catch((error) => {
    console.error("Dosya okunurken hata oluştu:", error);
  });
