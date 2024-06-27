const fs = require("fs");
const path = require("path");

const data = [
  ["data", "valor_medido"],
  ["2024-06-01", 5.1],
  ["2024-06-02", 4.8],
  ["2024-06-03", 5.3],
  ["2024-06-04", 5.0],
  ["2024-06-05", 4.9],
];

const csvContent = data.map((row) => row.join(",")).join("\n");

const filePath = path.join(__dirname, "exemplo.csv");

fs.writeFile(filePath, csvContent, (err) => {
  if (err) {
    console.error("Erro ao escrever o arquivo CSV", err);
  } else {
    console.log(`Arquivo CSV 'exemplo.csv' gerado com sucesso em ${filePath}`);
  }
});
