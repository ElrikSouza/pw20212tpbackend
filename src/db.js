import { Sequelize } from "sequelize";

export const db = new Sequelize({
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  username: process.env.DBUSER,
  host: process.env.DBHOST,
  dialect: "postgres",
});
