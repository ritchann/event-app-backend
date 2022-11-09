import { Sequelize } from "sequelize";

export const database =
  process.env.STATUS == "prod"
    ? new Sequelize(process.env.DATABASE_URL, {
        host: process.env.PROD_HOST,
        database: process.env.PROD_DATABASE,
        username: process.env.PROD_USERNAME,
        port: 5432,
        password: process.env.PROD_PASSWORD,
        dialect: "postgres",
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      })
    : new Sequelize({
        database: "",
        dialect: "postgres",
        storage: ":memory:",
        username: "",
        password: "",
        host: "",
      });
