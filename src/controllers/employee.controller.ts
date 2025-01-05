import { NextFunction, Request, Response } from "express";
import {
  createEmployee,
  deleteEmployeeById,
  findAllEmployees,
  findEmployeeById,
  updateEmployee,
  getAdminDashboard,
} from "../services/employee.service";
import { EmployeeInterface } from "../interfaces/Employee.interface";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const employeeData = req.body;
    const createdEmployee: EmployeeInterface = await createEmployee(
      employeeData
    );
    return res.status(201).json({ createdEmployee });
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
    await updateEmployee(id, updatedData);
    return res.status(200).json({ message: "Employee Updated Successfully" });
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
    const employee = await findEmployeeById(id);
    return res.status(200).json({ employee });
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
    const result = await findAllEmployees(req.query);
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
    await deleteEmployeeById(id);
    return res
      .status(200)
      .json({ message: "Employee is Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const dashboard = await getAdminDashboard();
    return res.status(200).json({ dashboard });
  } catch (error) {
    next(error);
  }
};
