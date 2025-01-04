require("dotenv").config();
const {
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_DIALECT,
} = process.env;

const databaseConfig = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT || "mysql",
  },
};
module.exports = databaseConfig;
