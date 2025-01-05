import { Application } from "express";
import { validateMiddleware } from "../middlewares/general.middleware";
import { validateCreateOrUpdateDepartment } from "../validations/department/department.validation";
import {
  create,
  destroy,
  findAll,
  findOne,
  update,
} from "../controllers/department.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleTypeEnum } from "../interfaces/User.interface";

const DepartmentRouter = (app: Application) => {
  /**
   * @swagger
   * /departments:
   *   get:
   *     summary: get all departments
   *     tags: [Department]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *           default: "createdAt"
   *       - in: query
   *         name: sortType
   *         schema:
   *           type: string
   *           default: ASC
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *           default: ""
   *     responses:
   *       200:
   *         description: list of departments with count
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 count:
   *                   type: integer
   *                 departments:
   *                   type: array
   */
  app.get(
    "/departments",
    authMiddleware([roleTypeEnum.ADMIN, roleTypeEnum.USER]),
    findAll
  );

  /**
   * @swagger
   * /departments/{id}:
   *   get:
   *     summary: get department with specific id
   *     tags: [Department ]
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *             type: string
   *             default: 1
   *          description: the department id
   *     responses:
   *       200:
   *         description: get department
   */
  app.get("/departments/:id", authMiddleware([roleTypeEnum.ADMIN]), findOne);

  /**
   * @swagger
   * /departments:
   *   post:
   *     summary: create new department
   *     tags: [Department ]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *     responses:
   *       201:
   *         description: department created successfully
   *       400:
   *         description: validation data errors
   */
  app.post(
    "/departments",
    authMiddleware([roleTypeEnum.ADMIN]),
    validateCreateOrUpdateDepartment,
    validateMiddleware,
    create
  );

  /**
   * @swagger
   * /departments/{id}:
   *   patch:
   *     summary: Update existed department
   *     tags: [Department ]
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *             type: string
   *             default: 1
   *          description: the department id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *     responses:
   *       200:
   *         description: department updated successfully
   *       400:
   *         description: validation data errors
   */
  app.patch(
    "/departments/:id",
    authMiddleware([roleTypeEnum.ADMIN]),
    validateCreateOrUpdateDepartment,
    validateMiddleware,
    update
  );

  /**
   * @swagger
   * /departments/{id}:
   *   delete:
   *     summary: delete department
   *     tags: [Department ]
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *             type: string
   *             default: 1
   *          description: the department id
   *     responses:
   *       201:
   *         description: department deleted successfully
   *       400:
   *         description: validation data errors
   */
  app.delete("/departments/:id", authMiddleware([roleTypeEnum.ADMIN]), destroy);
};

export default DepartmentRouter;
