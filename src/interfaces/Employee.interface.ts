export interface createEmployeeInterface {
  first_name: string;
  last_name: string;
  email: string;
  department_id: string;
  hire_date: Date;
  salary: number;
}

export interface updatedEmployeeInterface {
  first_name?: string;
  last_name?: string;
  email?: string;
  department_id?: string;
  hire_date?: Date;
  salary?: number;
}

export interface EmployeeInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  department_id?: string;
  hire_date?: Date;
  salary?: number;
  createdAt?: string;
}

export interface EmployeesWithCountInterface {
  count: number;
  rows: EmployeeInterface[];
}

export interface DashboardInterface {
  name?: string;
  count?: number;
}
