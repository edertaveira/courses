import { Database as DatabaseType } from "better-sqlite3";
import { initializeDatabase } from "../db";
import { Course } from "../models/course";

let db: DatabaseType;
initializeDatabase()
  .then((database) => {
    db = database;
    console.log("Banco de dados SQLite inicializado para coursesService.");
  })
  .catch((err) => {
    console.error("Erro ao inicializar o banco de dados:", err);
  });

export function createCourse(params: Omit<Course, "id">): Course {
  const { title, description, duration, instructor } = params;
  const stmt = db.prepare(
    `INSERT INTO courses (title, description, duration, instructor) VALUES (?, ?, ?, ?)`
  );
  const result = stmt.run(title, description, duration, instructor);
  return {
    id: result.lastInsertRowid!,
    title,
    description,
    duration,
    instructor,
  };
}

export function getCourses(titleFilter?: string): Course[] {
  let query = "SELECT * FROM courses";
  const params: any[] = [];
  if (titleFilter) {
    query += " WHERE lower(title) LIKE ?";
    params.push(`%${titleFilter.toLowerCase()}%`);
  }
  return db.prepare(query).all(params) as Course[];
}

export function getCourseById(id: number): Course | undefined {
  const stmt = db.prepare("SELECT * FROM courses WHERE id = ?");
  return stmt.get(id) as Course | undefined;
}

export function updateCourse(
  id: number,
  params: Omit<Course, "id">
): Course | null {
  const { title, description, duration, instructor } = params;
  const smtm = db.prepare(
    `UPDATE courses SET title = ?, description = ?, duration = ?, instructor = ? WHERE id = ?`
  );
  const result = smtm.run(title, description, duration, instructor, id);

  if (result.changes === 0) return null;
  const updatedCourse = getCourseById(id);
  return updatedCourse ?? null;
}

export function deleteCourse(id: number): boolean {
  const stmt = db.prepare("DELETE FROM courses WHERE id = ?");
  const result = stmt.run(id);
  return result?.changes !== undefined && result.changes > 0;
}
