import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // O formato esperado é "Bearer <token>"
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        res.status(403).json({ error: "Token inválido ou expirado" });
        return;
      }
      // Armazena as informações do usuário no request, se necessário
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "Autorização não fornecida" });
    return;
  }
};
