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
 *   description: Course Management
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
 *           example: "Node.js Course"
 *         description:
 *           type: string
 *           example: "Course description"
 *         duration:
 *           type: number
 *           example: 10
 *         instructor:
 *           type: string
 *           example: "Instructor Name"
 */
router.use("/", authenticateJWT);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
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
 *                 example: "Node.js Course"
 *               description:
 *                 type: string
 *                 example: "Detailed course description"
 *               duration:
 *                 type: number
 *                 example: 10
 *               instructor:
 *                 type: string
 *                 example: "Instructor Name"
 *     responses:
 *       201:
 *         description: Course created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error.
 */
router.post(
  "/courses",
  [
    body("title").isString().notEmpty().withMessage("Title is required."),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required."),
    body("duration").isNumeric().withMessage("Duration must be a number."),
    body("instructor")
      .isString()
      .notEmpty()
      .withMessage("Instructor is required."),
    validateRequest,
  ],
  createCourseController
);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Course ID
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
 *                 example: "Updated Course"
 *               description:
 *                 type: string
 *                 example: "Updated course description"
 *               duration:
 *                 type: number
 *                 example: 20
 *               instructor:
 *                 type: string
 *                 example: "Updated Instructor"
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Course not found.
 */
router.put(
  "/courses/:id",
  [
    body("title").isString().notEmpty().withMessage("Title is required."),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required."),
    body("duration").isNumeric().withMessage("Duration must be a number."),
    body("instructor")
      .isString()
      .notEmpty()
      .withMessage("Instructor is required."),
    validateRequest,
  ],
  updateCourseController
);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Returns the list of courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title filter (case insensitive)
 *     responses:
 *       200:
 *         description: List of courses.
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
 *     summary: Returns the details of a specific course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found.
 */
router.get("/courses/:id", getCourseByIdController);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Course ID to be deleted
 *     responses:
 *       204:
 *         description: Course successfully deleted.
 *       404:
 *         description: Course not found.
 */
router.delete("/courses/:id", deleteCourseController);

export default router;
