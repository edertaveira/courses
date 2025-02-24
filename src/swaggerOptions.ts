export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Courses API",
      version: "1.0.0",
      description: "Project Courses API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};
