import path from "path";
import Database from "better-sqlite3";

export async function initializeDatabase() {
  const db = new Database(path.join(__dirname, "../data/database.sqlite"));

  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL,
      instructor TEXT NOT NULL
    )
  `);

  return db;
}
