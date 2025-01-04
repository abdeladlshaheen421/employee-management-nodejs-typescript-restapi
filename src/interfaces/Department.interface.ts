export interface CreateDepartmentInterface {
  name: string;
}

export interface UpdateDepartmentInterface {
  name?: string;
}

export interface DepartmentInterface {
  id?: string;
  name?: string;
  createdAt?: string;
}

export interface DepartmentsWithCountInterface {
  count: number;
  rows: DepartmentInterface[];
}
