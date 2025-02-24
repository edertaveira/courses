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
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica o usuário e retorna um token JWT.
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
 *         description: Token JWT retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post(
  "/login",
  [
    body("username")
      .isString()
      .notEmpty()
      .withMessage("Username é obrigatório."),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password é obrigatório."),
  ],
  loginHandler
);
router.post("/login", loginHandler);

export default router;
