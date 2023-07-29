const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Guest extends Model {}
Guest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Guest",
    tableName: "guest", // Menentukan nama tabel menjadi 'Page'
    freezeTableName: true, // Nama tabel akan sama persis dengan nama model (admin)
    timestamps: false, // Nonaktifkan kolom createdAt dan updatedAt
  }
);

Guest.sync({ force: false })
  .then(() => {
    console.log("Model Admin berhasil disinkronkan dengan tabel");
  })
  .catch((err) => {
    console.error("Terjadi kesalahan saat menyinkronkan model Admin:", err);
  });

module.exports = Guest;
