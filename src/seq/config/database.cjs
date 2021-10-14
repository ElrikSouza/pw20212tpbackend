if (process.env.NODE_ENV == "local") {
  const { config } = require("dotenv");
  config({ path: ".local.env" });
}

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: "postgres",
    logging: true,
  },
  local: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME + "-test",
    host: process.env.DBHOST,
    dialect: "postgres",
    logging: false,
  },
};
