const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Koneksi database berhasil");
  })
  .catch((err) => {
    console.error("Koneksi database gagal: ", err);
  });

module.exports = sequelize;
