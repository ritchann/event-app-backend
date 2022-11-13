import { Sequelize } from "sequelize";

export const database = new Sequelize({
  database: "buildingSite",
  dialect: "postgres",
  storage: ":memory:",
  username: "postgres",
  password: "123456",
  host: "localhost",
});
