const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const cli = require("cli-color");
const DB_NAME = process.env.DB_NAME || "postgres";
const DB_PASS = process.env.DB_PASS || "1234";
const DB_USER = process.env.DB_USER || "postgres";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => {
    console.log(cli.bgBlue("Db connected"));
  })
  .catch((err) => {
    console.log(cli.red("db error connected", err.message));
  });

const db = {};
db.sequelize = sequelize;
db.book = require("./book")(sequelize, DataTypes);

// db.sequelize
//   .sync({ alter: true, force: true })
//   .then(() => {
//     console.log(cli.green("database succesfuly"));
//   })
//   .catch((err) => {
//     console.log(cli.red("database error", err.message));
//   });
module.exports = db;
