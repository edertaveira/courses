export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Cursos",
      version: "1.0.0",
      description: "Documentação da API de cursos do projeto",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};
