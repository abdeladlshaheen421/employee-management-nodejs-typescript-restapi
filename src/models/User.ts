import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import { hashPassword } from "../utils/Auth";
import { UserInterface } from "../interfaces/User.interface";

class User extends Model<UserInterface> {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      defaultValue: "USER",
      allowNull: false,
    },
  },
  {
    sequelize,
    hooks: {
      beforeCreate: async (instance: any, options: any) => {
        instance.password = await hashPassword(instance.password);
      },
      beforeUpdate: async (instance: any, options: any) => {
        if (instance.changed("password"))
          instance.password = await hashPassword(instance.password);
      },
    },
    paranoid: true,
    timestamps: true,
    tableName: "users",
    modelName: "User",
  }
);

export default User;
