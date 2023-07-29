const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Cat extends Model {}
Cat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    users: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cat",
    tableName: "cat", // Menentukan nama tabel menjadi 'Page'
    freezeTableName: true, // Nama tabel akan sama persis dengan nama model (admin)
    timestamps: false, // Nonaktifkan kolom createdAt dan updatedAt
  }
);

Cat.sync({ force: false })
  .then(() => {
    console.log("Model Admin berhasil disinkronkan dengan tabel");
  })
  .catch((err) => {
    console.error("Terjadi kesalahan saat menyinkronkan model Admin:", err);
  });

module.exports = Cat;
