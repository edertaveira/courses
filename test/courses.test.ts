let mockDb: {
  prepare: jest.Mock;
  run: jest.Mock;
  all: jest.Mock;
  get: jest.Mock;
};

jest.mock("../src/db", () => ({
  initializeDatabase: () => {
    mockDb = {
      run: jest.fn(),
      all: jest.fn(),
      get: jest.fn(),
      prepare: jest.fn((query: string) => ({
        run: mockDb.run,
        all: mockDb.all,
        get: mockDb.get,
      })),
    };
    return Promise.resolve(mockDb);
  },
}));

jest.mock("../src/middleware/auth", () => ({
  authenticateJWT: (
    req: import("express").Request,
    res: import("express").Response,
    next: import("express").NextFunction
  ) => next(),
}));

import request from "supertest";
import express from "express";
import coursesRouter from "../src/routes/courses";

const app = express();
app.use(express.json());
app.use("/", coursesRouter);

describe("Courses Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /courses - missing fields should return 400", async () => {
    const response = await request(app)
      .post("/courses")
      .send({ title: "Test Course" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("POST /courses - valid request should return 201 and created course", async () => {
    mockDb.run.mockReturnValueOnce({ lastInsertRowid: 1 });
    const courseData = {
      title: "Test Course",
      description: "Test Description",
      duration: 10,
      instructor: "Test Instructor",
    };
    const response = await request(app).post("/courses").send(courseData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, ...courseData });
    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO courses")
    );
    expect(mockDb.run).toHaveBeenCalledWith(
      courseData.title,
      courseData.description,
      courseData.duration,
      courseData.instructor
    );
  });

  test("GET /courses - with query filter should return filtered courses", async () => {
    const coursesList = [{ id: 1, title: "Test Course" }];
    mockDb.all.mockReturnValueOnce(coursesList);
    const response = await request(app)
      .get("/courses")
      .query({ title: "test" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(coursesList);
    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining("WHERE lower(title) LIKE ?")
    );
  });

  test("GET /courses/:id - valid course should return course details", async () => {
    const course = { id: 1, title: "Test Course" };
    mockDb.get.mockReturnValueOnce(course);
    const response = await request(app).get("/courses/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(course);
    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM courses WHERE id = ?")
    );
    expect(mockDb.get).toHaveBeenCalledWith(1);
  });

  test("GET /courses/:id - non-existent course should return 404", async () => {
    mockDb.get.mockReturnValueOnce(null);
    const response = await request(app).get("/courses/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  test("PUT /courses/:id - missing fields should return 400", async () => {
    const response = await request(app)
      .put("/courses/1")
      .send({ title: "Updated" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("PUT /courses/:id - valid update should return updated course", async () => {
    mockDb.run.mockReturnValueOnce({ changes: 1 });
    const updatedCourse = {
      id: 1,
      title: "Updated Course",
      description: "Updated Description",
      duration: 20,
      instructor: "Updated Instructor",
    };
    mockDb.get.mockReturnValueOnce(updatedCourse);
    const response = await request(app).put("/courses/1").send(updatedCourse);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCourse);
    expect(mockDb.prepare).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE courses SET")
    );
  });

  test("PUT /courses/:id - non-existent course should return 404", async () => {
    mockDb.run.mockReturnValueOnce({ changes: 0 });
    const courseData = {
      title: "Any",
      description: "Any",
      duration: 10,
      instructor: "Any",
    };
    const response = await request(app).put("/courses/999").send(courseData);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  test("DELETE /courses/:id - valid deletion should return 204", async () => {
    mockDb.run.mockReturnValueOnce({ changes: 1 });
    const response = await request(app).delete("/courses/1");
    expect(response.status).toBe(204);
  });

  test("DELETE /courses/:id - non-existent course should return 404", async () => {
    mockDb.run.mockReturnValueOnce({ changes: 0 });
    const response = await request(app).delete("/courses/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
