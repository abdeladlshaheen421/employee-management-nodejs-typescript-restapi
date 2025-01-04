import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import Employee from "./Employee";
import { DepartmentInterface } from "../interfaces/Department.interface";
class Department extends Model<DepartmentInterface> {}
Department.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    paranoid: true,
    timestamps: true,
    tableName: "departments",
    modelName: "Department",
  }
);

Department.hasMany(Employee, {
  foreignKey: "department_id",
  as: "employees",
});
export default Department;
