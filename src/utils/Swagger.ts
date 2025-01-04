import Swagger from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Employee Management API Documentation",
    version: "1.0.0",
    description: "API documentation for the Employee Management application",
  },
  servers: [
    {
      url: `http://localhost:${process.env.SERVER_PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = Swagger(options);
