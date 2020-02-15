const { Sequelize } = require("sequelize");

const host = "127.0.0.1";
const user = "AppUser";
const password = "FYi1HKyROjmHlRi0";
const database = "gohardcover";

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql"
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Dabase connection has been established successfully on " + host
    );
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
