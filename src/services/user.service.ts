import {
  CreateUserInterface,
  PaginationCriteriaInterface,
  UpdateUserInterface,
  UserInterface,
} from "../interfaces/User.interface";
import User from "../models/User";

export const findUserByUsername = async (
  username: string
): Promise<UserInterface | null> => {
  return <UserInterface | null>await User.findOne({
    where: {
      username,
    },
  });
};

export const createEmployee = async (
  user: CreateUserInterface
): Promise<UserInterface> => {
  return <UserInterface>await User.create({
    ...user,
  });
};

export const updateEmployee = async (
  empId: string,
  userUpdatedData: UpdateUserInterface
): Promise<void> => {
  await User.update(userUpdatedData, {
    where: {
      id: empId,
    },
    individualHooks: true,
  });
};
