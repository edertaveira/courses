import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateJWT } from "../middleware/auth";
import {
  createCourseController,
  getCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
} from "../controllers/coursesController";
import validateRequest from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Gerenciamento de cursos
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: "Curso de Node.js"
 *         description:
 *           type: string
 *           example: "Descrição do curso"
 *         duration:
 *           type: number
 *           example: 10
 *         instructor:
 *           type: string
 *           example: "Nome do Instrutor"
 */
router.use("/", authenticateJWT);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - duration
 *               - instructor
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Curso de Node.js"
 *               description:
 *                 type: string
 *                 example: "Descrição detalhada do curso"
 *               duration:
 *                 type: number
 *                 example: 10
 *               instructor:
 *                 type: string
 *                 example: "Nome do Instrutor"
 *     responses:
 *       201:
 *         description: Curso criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Erro de validação.
 */
router.post(
  "/courses",
  [
    body("title").isString().notEmpty().withMessage("Title é obrigatório."),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description é obrigatória."),
    body("duration").isNumeric().withMessage("Duration deve ser um número."),
    body("instructor")
      .isString()
      .notEmpty()
      .withMessage("Instructor é obrigatório."),
    validateRequest,
  ],
  createCourseController
);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Atualiza os dados de um curso existente
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - duration
 *               - instructor
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Curso Atualizado"
 *               description:
 *                 type: string
 *                 example: "Descrição atualizada do curso"
 *               duration:
 *                 type: number
 *                 example: 20
 *               instructor:
 *                 type: string
 *                 example: "Instrutor Atualizado"
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Curso não encontrado.
 */
router.put(
  "/courses/:id",
  [
    body("title").isString().notEmpty().withMessage("Title é obrigatório."),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description é obrigatória."),
    body("duration").isNumeric().withMessage("Duration deve ser um número."),
    body("instructor")
      .isString()
      .notEmpty()
      .withMessage("Instructor é obrigatório."),
    validateRequest,
  ],
  updateCourseController
);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retorna a lista de cursos
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtro por título (case insensitive)
 *     responses:
 *       200:
 *         description: Lista de cursos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/courses", getCoursesController);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Retorna os detalhes de um curso específico
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Detalhes do curso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso não encontrado.
 */
router.get("/courses/:id", getCourseByIdController);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Remove um curso pelo ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do curso a ser removido
 *     responses:
 *       204:
 *         description: Curso removido com sucesso.
 *       404:
 *         description: Curso não encontrado.
 */
router.delete("/courses/:id", deleteCourseController);

export default router;
