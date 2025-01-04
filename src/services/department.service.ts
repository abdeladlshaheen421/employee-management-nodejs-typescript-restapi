import Department from "../models/Department";
import {
  CreateDepartmentInterface,
  DepartmentInterface,
  DepartmentsWithCountInterface,
  UpdateDepartmentInterface,
} from "../interfaces/Department.interface";
import { Pagination, PaginationInterface } from "../utils/Pagination";

export async function createDepartment(
  createdDepartment: CreateDepartmentInterface
): Promise<DepartmentInterface> {
  return <DepartmentInterface>await Department.create({ ...createdDepartment });
}

export async function updateDepartment(
  id: string,
  updatedData: UpdateDepartmentInterface
): Promise<void> {
  await Department.update(
    { ...updatedData },
    {
      where: {
        id,
      },
    }
  );
}

export async function findAllDepartments(
  query: PaginationInterface
): Promise<DepartmentsWithCountInterface> {
  const pagination = new Pagination({
    ...query,
    columns: ["name"],
  });
  return <DepartmentsWithCountInterface>await Department.findAndCountAll({
    ...pagination.getPreparedQuery(),
  });
}

export async function findDepartmentById(
  id: string
): Promise<DepartmentInterface | null> {
  return <DepartmentInterface>await Department.findByPk(id);
}

export async function deleteDepartmentById(id: string): Promise<void> {
  await Department.destroy({
    where: {
      id,
    },
  });
}
