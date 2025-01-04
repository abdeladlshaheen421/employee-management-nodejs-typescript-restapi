import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors
      .formatWith(({ msg, param }: ValidationError) => {
        Object.assign(formattedErrors, { [param]: msg });
        return { [param]: msg };
      })
      .array();

    return res.status(400).json({
      errors: formattedErrors,
    });
  }

  next();
};
