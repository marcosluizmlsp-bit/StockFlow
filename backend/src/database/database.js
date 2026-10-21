
const Database = require("better-sqlite3");
const path = require("node:path");

const databasePath = path.join(__dirname, "stockflow.db");

const db = new Database(databasePath);

module.exports = db;
