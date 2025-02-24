import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";

const validateRequest: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // sem retornar um valor
  }
  next();
};

export default validateRequest;
