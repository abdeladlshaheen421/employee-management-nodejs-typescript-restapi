import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import Department from "./Department";
import { EmployeeInterface } from "../interfaces/Employee.interface";
class Employee extends Model<EmployeeInterface> {}
Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.UUID,
      references: {
        model: Department,
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "set null",
    },
    hire_date: DataTypes.DATE,
    salary: {
      type: DataTypes.DOUBLE(15, 3),
    },
  },
  {
    sequelize,
    paranoid: true,
    timestamps: true,
    tableName: "employees",
    modelName: "Employee",
  }
);

export default Employee;
