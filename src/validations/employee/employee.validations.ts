import { body } from "express-validator";
import { EmployeeInterface } from "../../interfaces/Employee.interface";
import { findEmployeeByEmail } from "../../services/employee.service";

export const validateCreateEmployee = [
  body("first_name")
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("please enter a first name with 2 : 255 characters"),
  body("last_name")
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("please enter a last name with 2 : 255 characters"),
  body("email")
    .isEmail()
    .withMessage("please enter a valid email address")
    .bail()
    .custom(async (value: string, { req }) => {
      const employee: EmployeeInterface = await findEmployeeByEmail(value);
      if (employee) throw new Error("Email address already in use");
    }),
  body("department_id")
    .isUUID("4")
    .withMessage("please enter a correct department Id")
    .bail()
    .custom(async (departmentId: string, { req }) => {
      //get department if not found throw new Error("Selected Department Not Founded Please Select department of available departments")
    }),
  body("hire_date")
    .isISO8601()
    .withMessage("please enter a valid date ex. YYYY-MM-DD"),
  body("salary")
    .isFloat({ min: 0, max: 1000000 })
    .withMessage("please enter valid salary value 0 - 1000000"),
];

export const validateUpdateEmployee = [
  body("first_name")
    .optional()
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("please enter a first name with 2 : 255 characters"),
  body("last_name")
    .optional()
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("please enter a last name with 2 : 255 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("please enter a valid email address")
    .bail()
    .custom(async (value: string, { req }) => {
      const employee: EmployeeInterface = await findEmployeeByEmail(value);
      if (
        employee &&
        req.params &&
        req.params.id &&
        employee.id !== req.params.id
      )
        throw new Error("Email address already in use");
    }),
  body("department_id")
    .optional()
    .isUUID("4")
    .withMessage("please enter a correct department Id")
    .bail()
    .custom(async (departmentId: string, { req }) => {
      //get department if not found throw new Error("Selected Department Not Founded Please Select department of available departments")
    }),
  body("hire_date")
    .optional()
    .isISO8601()
    .withMessage("please enter a valid date ex. YYYY-MM-DD"),
  body("salary")
    .optional()
    .isFloat({ min: 0, max: 1000000 })
    .withMessage("please enter valid salary value 0 - 1000000"),
];
