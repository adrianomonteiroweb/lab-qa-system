const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`CREATE TABLE samples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT,
    valor_medido REAL
  )`);
});

module.exports = db;
