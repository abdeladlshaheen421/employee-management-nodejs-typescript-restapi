const databaseConfig = require("./config");
import { Sequelize } from "sequelize";

const ENV = process.env.ENV ?? "development";
const sequelize = new Sequelize({ ...Object(databaseConfig)[ENV] });

export default sequelize;
