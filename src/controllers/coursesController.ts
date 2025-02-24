import { Request, Response } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../services/coursesService";

// Cria um novo curso.
export const createCourseController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const { title, description, duration, instructor } = req.body;
	if (!title || !description || !duration || !instructor) {
		res.status(400).json({ error: "Todos os campos são obrigatórios." });
		return;
	}
	try {
		const newCourse = createCourse({ title, description, duration, instructor });
		res.status(201).json(newCourse);
	} catch (err) {
		console.error("Erro ao criar o curso:", err);
		res.status(500).json({ error: "Erro ao criar o curso." });
	}
};

// Retorna a lista de cursos.
export const getCoursesController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const { title } = req.query;
	try {
		const courses = getCourses(title && typeof title === "string" ? title : undefined);
		res.json(courses);
	} catch (err) {
		console.error("Erro ao buscar cursos:", err);
		res.status(500).json({ error: "Erro ao buscar cursos." });
	}
};

// Retorna os detalhes de um curso específico pelo ID.
export const getCourseByIdController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const id = parseInt(req.params.id, 10);
	try {
		const course = getCourseById(id);
		if (!course) {
			res.status(404).json({ error: "Curso não encontrado." });
			return;
		}
		res.json(course);
	} catch (err) {
		console.error("Erro ao buscar o curso:", err);
		res.status(500).json({ error: "Erro ao buscar o curso." });
	}
};

// Atualiza um curso existente pelo ID.
export const updateCourseController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const id = parseInt(req.params.id, 10);
	const { title, description, duration, instructor } = req.body;
	if (!title || !description || !duration || !instructor) {
		res.status(400).json({ error: "Todos os campos são obrigatórios para atualização." });
		return;
	}
	try {
		const updatedCourse = updateCourse(id, { title, description, duration, instructor });
		if (!updatedCourse) {
			res.status(404).json({ error: "Curso não encontrado." });
			return;
		}
		res.json(updatedCourse);
	} catch (err) {
		console.error("Erro ao atualizar o curso:", err);
		res.status(500).json({ error: "Erro ao atualizar o curso." });
	}
};

// Remove um curso pelo ID.
export const deleteCourseController = async (req: Request, res: Response): Promise<void> => {
	// ...existing code extraction...
	const id = parseInt(req.params.id, 10);
	try {
		const success = deleteCourse(id);
		if (!success) {
			res.status(404).json({ error: "Curso não encontrado." });
			return;
		}
		res.status(204).send();
	} catch (err) {
		console.error("Erro ao deletar o curso:", err);
		res.status(500).json({ error: "Erro ao deletar o curso." });
	}
};
