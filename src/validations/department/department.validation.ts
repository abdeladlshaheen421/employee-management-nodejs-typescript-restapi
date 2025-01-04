import { body } from "express-validator";

export const validateCreateOrUpdateDepartment = [
  body("name")
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage(
      "please enter a valid department name with least 2 character to 255 characters"
    ),
];
