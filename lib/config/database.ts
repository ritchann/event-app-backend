import { Sequelize } from "sequelize";

export const database = new Sequelize(
  "postgres://qntqbprdkafzoq:5639eccb4555c8c8d158304a1e09656c53c2d0d590256f80869565b0bfeff1e5@ec2-3-248-121-12.eu-west-1.compute.amazonaws.com:5432/d62jpgju87nnc0",
  {
    host: "ec2-3-248-121-12.eu-west-1.compute.amazonaws.com",
    database: "d62jpgju87nnc0",
    username: "qntqbprdkafzoq",
    port: 5432,
    password:
      "5639eccb4555c8c8d158304a1e09656c53c2d0d590256f80869565b0bfeff1e5",
    dialect: "postgres"
  }
);

// {
//   database: "buildingSite", // name of database
//   dialect: "postgres",
//   storage: ":memory:",
//   username: "postgres", //username
//   password: "123456", //password
//   host:'localhost'
// }