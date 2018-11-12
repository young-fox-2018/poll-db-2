
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./poll-2.db");

module.exports = db