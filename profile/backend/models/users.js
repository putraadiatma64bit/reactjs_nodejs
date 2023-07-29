const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Users extends Model {}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "users",
    reezeTableName: true, // Nama tabel akan sama persis dengan nama model (admin)
    //timestamps: false, // Nonaktifkan kolom createdAt dan updatedAt// Nama tabel di database
  }
);

Users.sync({ force: false })
  .then(() => {
    console.log("Model User berhasil disinkronkan dengan tabel");
  })
  .catch((err) => {
    console.error("Terjadi kesalahan saat menyinkronkan model User:", err);
  });

module.exports = Users;
