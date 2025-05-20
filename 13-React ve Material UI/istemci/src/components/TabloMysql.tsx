import { DataGrid, GridColDef } from "@mui/x-data-grid"; // DataGrid bileşenini ve GridColDef tipini içe aktarır
import { Paper } from "@mui/material"; // Paper bileşenini içe aktarır

// Tablo bileşeni için props arayüzünü tanımlar
interface TabloProps {
  data: { ID: number; KitapAdi: string; SayfaSayisi: number }[]; // Verilerin yapısını belirtir
}

// Tablo bileşeni, props olarak data alır
function Tablo({ data }: TabloProps) {
  // DataGrid bileşeni için sütun tanımları
  const columns: GridColDef[] = [
    { field: "ID", headerName: "No", width: 70 }, // ID sütunu
    { field: "KitapAdi", headerName: "Kitap Adı", width: 200 }, // Kitap Adı sütunu
    { field: "SayfaSayisi", headerName: "Sayfa Sayısı", width: 130 }, // Sayfa Sayısı sütunu
  ];

  return (
    // Paper bileşeni, DataGrid bileşenini sarmalar ve stil ekler
    <Paper elevation={3} sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={data} // DataGrid bileşenine veri sağlar
        columns={columns} // DataGrid bileşenine sütun tanımları sağlar
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7, // Sayfa başına gösterilecek satır sayısı
            },
          },
        }}
        rowHeight={25} // Satır yüksekliğini ayarlar
        pageSizeOptions={[7]} // Sayfa boyutu seçeneklerini belirler
        getRowId={(row) => row.ID} // Her satır için özel id belirler
      />
    </Paper>
  );
}

export default Tablo; // Tablo bileşenini dışa aktarır
