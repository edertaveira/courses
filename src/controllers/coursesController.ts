import { Request, Response } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../services/coursesService";

// Creates a new course.
export const createCourseController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const { title, description, duration, instructor } = req.body;
	if (!title || !description || !duration || !instructor) {
		res.status(400).json({ error: "All fields are required." });
		return;
	}
	try {
		const newCourse = createCourse({ title, description, duration, instructor });
		res.status(201).json(newCourse);
	} catch (err) {
		console.error("Error creating course:", err);
		res.status(500).json({ error: "Error creating course." });
	}
};

// Returns the list of courses.
export const getCoursesController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const { title } = req.query;
	try {
		const courses = getCourses(title && typeof title === "string" ? title : undefined);
		res.json(courses);
	} catch (err) {
		console.error("Error retrieving courses:", err);
		res.status(500).json({ error: "Error retrieving courses." });
	}
};

// Returns the details of a specific course by ID.
export const getCourseByIdController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const id = parseInt(req.params.id, 10);
	try {
		const course = getCourseById(id);
		if (!course) {
			res.status(404).json({ error: "Course not found." });
			return;
		}
		res.json(course);
	} catch (err) {
		console.error("Error retrieving course:", err);
		res.status(500).json({ error: "Error retrieving course." });
	}
};

// Updates an existing course by ID.
export const updateCourseController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const id = parseInt(req.params.id, 10);
	const { title, description, duration, instructor } = req.body;
	if (!title || !description || !duration || !instructor) {
		res.status(400).json({ error: "All fields are required for update." });
		return;
	}
	try {
		const updatedCourse = updateCourse(id, { title, description, duration, instructor });
		if (!updatedCourse) {
			res.status(404).json({ error: "Course not found." });
			return;
		}
		res.json(updatedCourse);
	} catch (err) {
		console.error("Error updating course:", err);
		res.status(500).json({ error: "Error updating course." });
	}
};

// Removes a course by ID.
export const deleteCourseController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const id = parseInt(req.params.id, 10);
	try {
		const success = deleteCourse(id);
		if (!success) {
			res.status(404).json({ error: "Course not found." });
			return;
		}
		res.status(204).send();
	} catch (err) {
		console.error("Error deleting course:", err);
		res.status(500).json({ error: "Error deleting course." });
	}
};
