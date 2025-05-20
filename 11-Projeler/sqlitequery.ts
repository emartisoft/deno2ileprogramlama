import { Database } from "jsr:@db/sqlite@^0.12.0";

const db = new Database("./db/chinook.db");

const result = db.prepare(
  "SELECT CustomerId, FirstName, LastName FROM customers LIMIT 10;",
);

for (const row of result.all(1)) {
  console.log(row.CustomerId + ". " + row.FirstName + " " + row.LastName);
}

db.close();
