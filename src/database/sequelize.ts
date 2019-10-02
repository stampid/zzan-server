import { Sequelize } from "sequelize-typescript";
import env from "../lib/env";

export const sequelize = new Sequelize({
  dialect: "mysql",
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  models: [__dirname + "/models"]
});

// export const sequelize = new Sequelize({
//     dialect: "mysql",
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     models: [__dirname + "/models"]
//   });
