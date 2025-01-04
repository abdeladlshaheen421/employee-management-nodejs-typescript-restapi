import { Application } from "express";
import { swaggerSpec } from "../utils/Swagger";
import swaggerUi from "swagger-ui-express";

const SwaggerRouter = (app: Application) => {
  app.use("/api-documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default SwaggerRouter;
