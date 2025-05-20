// JSON verisini API'den al
async function fetchCustomers() {
  const datam = await fetch("http://localhost:9000/musteriler");
  const rdata = await datam.json();

  // Verileri tabloya ekle
  const tableBody = document
    .getElementById("customerTable")
    .getElementsByTagName("tbody")[0];
  rdata.forEach((customer) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = customer.CustomerId;
    row.insertCell(1).textContent = customer.FirstName;
    row.insertCell(2).textContent = customer.LastName;
  });
}

// Sayfa yüklendiğinde veriyi al
globalThis.onload = fetchCustomers;
