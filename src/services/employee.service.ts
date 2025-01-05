import Employee from "../models/Employee";
import {
  createEmployeeInterface,
  EmployeeInterface,
  EmployeesWithCountInterface,
  updatedEmployeeInterface,
  DashboardInterface,
} from "../interfaces/Employee.interface";
import { Pagination, PaginationInterface } from "../utils/Pagination";
import { Sequelize } from "sequelize";
import Department from "../models/Department";

export async function createEmployee(
  employeeData: createEmployeeInterface
): Promise<EmployeeInterface> {
  return <EmployeeInterface>await Employee.create({ ...employeeData });
}

export async function updateEmployee(
  id: string,
  updatedData: updatedEmployeeInterface
): Promise<void> {
  Employee.update(
    {
      ...updatedData,
    },
    {
      where: {
        id,
      },
    }
  );
}

export async function findAllEmployees(
  query: PaginationInterface
): Promise<EmployeesWithCountInterface> {
  const pagination = new Pagination({
    ...query,
    columns: ["first_name", "last_name", "email", "hire_date", "salary"],
  });
  return <EmployeesWithCountInterface>await Employee.findAndCountAll({
    ...pagination.getPreparedQuery(),
    include: [{ association: "department" }],
  });
}

export async function findEmployeeById(
  id: string
): Promise<EmployeeInterface | null> {
  return <EmployeeInterface>await Employee.findByPk(id);
}

export async function deleteEmployeeById(id: string): Promise<void> {
  await Employee.destroy({
    where: {
      id,
    },
  });
}

export async function findEmployeeByEmail(
  email: string
): Promise<EmployeeInterface> {
  return <EmployeeInterface>await Employee.findOne({
    where: { email },
  });
}

export async function getAdminDashboard(): Promise<DashboardInterface> {
  return <DashboardInterface>await Department.findAll({
    include: [{ association: "employees", attributes: [] }],
    attributes: [
      "id",
      "name",
      [Sequelize.fn("COUNT", Sequelize.col("employees.id")), "count"],
    ],
    group: ["Department.id", "Department.name"],
  });
}
