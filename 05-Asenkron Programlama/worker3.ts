self.onmessage = (e: MessageEvent<number>) => {
  const task = e.data;
  try {
    // Örnek işlem: sayıyı karesiyle çarp
    if (typeof task !== "number") {
      throw new Error("Geçersiz görev tipi");
    }
    const result = task * task;
    self.postMessage(result);
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
