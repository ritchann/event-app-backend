import { Sequelize } from "sequelize";

export const database = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  port: 5432,
  password: process.env.PASSWORD,
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
