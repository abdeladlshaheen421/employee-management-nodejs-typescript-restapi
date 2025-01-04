import { body } from "express-validator";
import { roleTypeEnum, UserInterface } from "../../interfaces/User.interface";
import { findUserByUsername } from "../../services/user.service";

export const validateLoginData = [
  body("username").isString().withMessage("please enter a username"),
  body("password").isString().withMessage("please enter a Password"),
];

export const validateCreateUserData = [
  body("username")
    .isString()
    .withMessage("please enter a username")
    .bail()
    .custom(async (value: string, { req }) => {
      const user: UserInterface | null = await findUserByUsername(value);
      if (user) throw new Error("Username already in use");
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "please enter a valid Password at lease (8 character, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  body("role")
    .isIn([roleTypeEnum.ADMIN, roleTypeEnum.USER])
    .withMessage("please enter valid role (ADMIN or USER)"),
];

export const validateUpdateUserData = [
  body("username")
    .optional()
    .isString()
    .withMessage("please enter a Username")
    .custom(async (value: string, { req }) => {
      const user: UserInterface | null = await findUserByUsername(value);
      if (user && req.params && req.params.id !== user.id)
        throw new Error("Username already in use");
    }),
  body("password")
    .optional()
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "please enter a valid Password at lease (8 character, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  body("role")
    .optional()
    .isIn([roleTypeEnum.ADMIN, roleTypeEnum.USER])
    .withMessage("please enter valid role (ADMIN or USER)"),
];
