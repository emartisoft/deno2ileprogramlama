import { useEffect, useState } from "react"; // React hook'larını içe aktarır
import { Box, Button, Typography } from "@mui/material"; // Material-UI bileşenlerini içe aktarır
import TabloMysql from "./components/TabloMysql.tsx"; // MySQL tablosu bileşenini içe aktarır
import TabloMongo from "./components/TabloMongo.tsx"; // MongoDB tablosu bileşenini içe aktarır
import "./App.css"; // Stil dosyasını içe aktarır

const App = () => {
  // MySQL ve MongoDB verilerini saklamak için state tanımları
  const [mysqldata, setMysqlData] = useState([]);
  const [mongodata, setMongoData] = useState([]);
  const [sayac, setSayac] = useState(0);

  // Sayacı artıran fonksiyon
  const inc = () => setSayac(sayac + 1);

  const ip = "192.168.68.102"; // Deno sunucu IP adresi

  // useEffect hook'u, sayac değiştiğinde MySQL verilerini çeker
  useEffect(() => {
    fetch("http://" + ip + ":8000/mysqldata") // MySQL verilerini çekmek için istek yapar
      .then((response) => response.json()) // Yanıtı JSON formatında işler
      .then((mysqldata) => setMysqlData(mysqldata)) // Verileri state'e kaydeder
      .catch((error) => console.error("Veri çekme hatası:", error)); // Hata durumunda konsola yazdırır
  }, [sayac]); // sayac değiştiğinde bu effect çalışır

  // useEffect hook'u, sayac değiştiğinde MongoDB verilerini çeker
  useEffect(() => {
    fetch("http://" + ip + ":8000/mongodata") // MongoDB verilerini çekmek için istek yapar
      .then((response) => response.json()) // Yanıtı JSON formatında işler
      .then((mongodata) => setMongoData(mongodata)) // Verileri state'e kaydeder
      .catch((error) => console.error("Veri çekme hatası:", error)); // Hata durumunda konsola yazdırır
  }, [sayac]); // sayac değiştiğinde bu effect çalışır

  return (
  <>
    <div>
      {/* Başlık */}
      <Typography variant="h4" gutterBottom>
        Kitap Listem
      </Typography>
      <Box>
        {/* MySQL verilerini gösteren tablo */}
        <TabloMysql data={mysqldata} />
        <br />
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          <b>MySQL</b>
          veritabanından kitap adlarını ve sayfa sayılarını gösteren tablo
        </Typography>
        <br />
        {/* MongoDB verilerini gösteren tablo */}
        <TabloMongo data={mongodata} />
        <br />
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          <b>MongoDB</b>
          veritabanından kitap adlarını ve sayfa sayılarını gösteren tablo
        </Typography>
      </Box>

      {/* Yenileme sayısını gösterir */}
      <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
        YENİLEME SAYISI: {sayac}
      </Typography>
      {/* Yenileme butonu */}
      <Button variant="contained" onClick={inc}>YENİLE</Button>
    </div>
  </>
  );
};

export default App; // App bileşenini dışa aktarır
