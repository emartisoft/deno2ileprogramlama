import { useState } from "preact/hooks";

export default function Card() {
  const [loading, setLoading] = useState(false);
  // Başlangıçta varsayılan resim ve boş yorum
  const [data, setData] = useState({
    comment: "Henüz yorum yok.",
    imageSrc: "/images/null.jpg",
  });

  async function handleCapture() {
    setLoading(true);
    try {
      const res = await fetch("/api/capture");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.error("Capture isteğinde hata oluştu.");
      }
    } catch (err) {
      console.error("İstek hatası:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="card shadow-lg p-4 rounded-md">
          <img
            src={data.imageSrc}
            alt="Captured"
            class="w-96 h-96 object-cover mb-4"
          />
          <p class="w-96 text-center break-words whitespace-normal">
            {data.comment}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCapture}
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Fotoğraf Görüntüsü Al
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-2xl">
            İşlem yapılırken bekleyiniz...
          </div>
        </div>
      )}
    </div>
  );
}
