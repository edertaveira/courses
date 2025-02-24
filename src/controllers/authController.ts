import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const predefinedUser = {
  username: process.env.USERNAME || "admin",
  password: process.env.PASSWORD || "admin",
};

const loginHandler: RequestHandler = (req, res): void => {
  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  if (
    username !== predefinedUser.username ||
    password !== predefinedUser.password
  ) {
    res.status(401).json({ error: "Credenciais inválidas." });
    return;
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.json({ token });
  return;
};

export default loginHandler;
