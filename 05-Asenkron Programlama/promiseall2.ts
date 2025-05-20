async function fetch10(): Promise<string> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/10",
  );
  const data = await response.json();
  return data.title;
}

async function fetch11(): Promise<string> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/11",
  );
  const data = await response.json();
  return data.title;
}

async function fetchAllData() {
  try {
    // 2 adet asenkron veri alma
    const [f10, f11] = await Promise.all([fetch10(), fetch11()]);
    console.log("f10 Title:", f10);
    console.log("f11 Title:", f11);
  } catch (error) {
    console.error("Hata:", error);
  }
}
// Asenkron verileri al
fetchAllData();
