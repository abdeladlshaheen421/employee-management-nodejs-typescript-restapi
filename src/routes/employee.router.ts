import { Application } from "express";
import {
  create,
  destroy,
  findAll,
  findOne,
  update,
  getDashboard,
} from "../controllers/employee.controller";
import { validateMiddleware } from "../middlewares/general.middleware";
import {
  validateCreateEmployee,
  validateUpdateEmployee,
} from "../validations/employee/employee.validations";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleTypeEnum } from "../interfaces/User.interface";

const EmployeeRouter = (app: Application) => {
  /**
   * @swagger
   * /employees:
   *   get:
   *     summary: get all employees
   *     tags: [Employee]
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
   *     responses:
   *       200:
   *         description: list of employees with count
   *         content:
   *            application/json:
   *              schema:
   *                 type: object
   *                 properties:
   *                    count:
   *                        type: integer
   *                    employees:
   *                        type: array
   */
  app.get("/employees", authMiddleware([roleTypeEnum.ADMIN]), findAll);

  /**
   * @swagger
   * /employees/{id}:
   *   get:
   *     summary: get employee with specific id
   *     tags: [Employee ]
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *             type: string
   *             default: 1
   *          description: the employee id
   *     responses:
   *       200:
   *         description:  employee data
   */
  app.get("/employees/:id", authMiddleware([roleTypeEnum.ADMIN]), findOne);

  /**
   * @swagger
   * /employees:
   *   post:
   *     summary: create new employee
   *     tags: [Employee ]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               email:
   *                 type: string
   *               department_id:
   *                 type: string
   *               hire_date:
   *                 type: string
   *               salary:
   *                 type: number
   *     responses:
   *       201:
   *         description: employee created successfully
   *       400:
   *         description: validation data errors
   */
  app.post(
    "/employees",
    authMiddleware([roleTypeEnum.ADMIN]),
    validateCreateEmployee,
    validateMiddleware,
    create
  );

  /**
   * @swagger
   * /employees/{id}:
   *   patch:
   *     summary: Update current employee
   *     tags: [Employee ]
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *             type: string
   *             default: 1
   *          description: the employee id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               first_name:
   *                 type: string
   *               last_name:
   *                 type: string
   *               email:
   *                 type: string
   *               department_id:
   *                 type: string
   *               hire_date:
   *                 type: string
   *               salary:
   *                 type: number
   *     responses:
   *       201:
   *         description: employee updated successfully
   *       400:
   *         description: validation data errors
   */
  app.patch(
    "/employees/:id",
    authMiddleware([roleTypeEnum.ADMIN]),
    validateUpdateEmployee,
    validateMiddleware,
    update
  );

  /**
   * @swagger
   * /employees/{id}:
   *   delete:
   *     summary: delete employee
   *     tags: [Employee ]
   *     parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *             type: string
   *             default: 1
   *          description: the employee id
   *     responses:
   *       200:
   *         description: employee deleted successfully
   *       400:
   *         description: validation data errors
   */
  app.delete("/employees/:id", authMiddleware([roleTypeEnum.ADMIN]), destroy);

  /**
   * @swagger
   * /dashboard:
   *   get:
   *     summary: get admin dashboard
   *     tags: [Dashboard ]
   *     responses:
   *       200:
   *         description:  dashboard data
   */
  app.get("/dashboard", authMiddleware([roleTypeEnum.ADMIN]), getDashboard);
};

export default EmployeeRouter;
