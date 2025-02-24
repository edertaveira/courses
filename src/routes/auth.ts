import express from "express";
import dotenv from "dotenv";
import loginHandler from "../controllers/authController";
import { body } from "express-validator";

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates the user and returns a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: JWT token returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Invalid credentials.
 */
router.post(
  "/login",
  [
    body("username")
      .isString()
      .notEmpty()
      .withMessage("Username is required."),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required."),
  ],
  loginHandler
);
router.post("/login", loginHandler);

export default router;
