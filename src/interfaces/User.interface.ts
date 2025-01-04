export interface LoginRequestBodyInterface {
  username: string;
  password?: Date;
}
export enum roleTypeEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface TokenDecodedToken {
  id: string;
  role: roleTypeEnum;
}
//id username password role
export interface UserInterface {
  id?: string;
  username?: string;
  password?: string;
  role?: roleTypeEnum;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface CreateUserInterface {
  username: string;
  password: string;
  role: roleTypeEnum;
}

export interface UpdateUserInterface {
  username?: string;
  password?: string;
  role?: roleTypeEnum;
}

export interface PaginationCriteriaInterface {
  limit: string;
  page: string;
}
