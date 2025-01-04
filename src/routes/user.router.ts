import { Application } from "express";
import { validateMiddleware } from "../middlewares/general.middleware";
import {
  validateCreateUserData,
  validateLoginData,
  validateUpdateUserData,
} from "../validations/user/user.validations";
import { create, login, update } from "../controllers/user.controller";
import { authMiddleware } from "..//middlewares/auth.middleware";

const UserRouter = (app: Application) => {
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login a user
   *     tags: [Auth ]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful login
   *       401:
   *         description: Invalid credentials
   *       400:
   *         description: error with login data
   */
  app.post("/auth/login", validateLoginData, validateMiddleware, login);

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a user
   *     tags: [Auth ]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *               role:
   *                 type: string
   *     responses:
   *       201:
   *         description: Successful Register
   *       400:
   *         description: validation errors
   */
  app.post(
    "/auth/register",
    validateCreateUserData,
    validateMiddleware,
    create
  ); //only used to test

  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: Update user profile
   *     tags: [User ]
   *     parameters:
   *        - in: path
   *          name: user id
   *          schema:
   *             type: string
   *             description: the user id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *               role:
   *                 type: string
   *     responses:
   *       200:
   *         description: Updated user profile Successfully
   *       400:
   *         description: validation data errors
   */
  app.patch(
    "/users/:id",
    authMiddleware(),
    validateUpdateUserData,
    validateMiddleware,
    update
  );
};

export default UserRouter;
