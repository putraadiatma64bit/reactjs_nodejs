const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Slide extends Model {}
Slide.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    users: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Slide",
    tableName: "slide", // Menentukan nama tabel menjadi 'Page'
    freezeTableName: true, // Nama tabel akan sama persis dengan nama model (admin)
    //timestamps: false, // Nonaktifkan kolom createdAt dan updatedAt
  }
);

Slide.sync({ force: false })
  .then(() => {
    console.log("Model Admin berhasil disinkronkan dengan tabel");
  })
  .catch((err) => {
    console.error("Terjadi kesalahan saat menyinkronkan model Admin:", err);
  });

module.exports = Slide;
