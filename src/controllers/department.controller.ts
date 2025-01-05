import { NextFunction, Request, Response } from "express";
import {
  createDepartment,
  deleteDepartmentById,
  findAllDepartments,
  findDepartmentById,
  updateDepartment,
} from "../services/department.service";
import { DepartmentInterface } from "../interfaces/Department.interface";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const departmentData = req.body;
    const createdDepartment: DepartmentInterface = await createDepartment(
      departmentData
    );
    return res.status(201).json({ createdDepartment });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await updateDepartment(id, updatedData);
    return res.status(200).json({ message: "Department Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const department = await findDepartmentById(id);
    return res.status(200).json({ department });
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const result = await findAllDepartments(req.query);
    return res.status(200).json({ ...result });
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    await deleteDepartmentById(id);
    return res
      .status(200)
      .json({ message: "Department is Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
