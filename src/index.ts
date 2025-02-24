import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import courseRoutes from "./routes/courses";
import { swaggerOptions } from "./swaggerOptions";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", authRoutes);
app.use("/", courseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express com JWT funcionando!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Erro interno do servidor");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
