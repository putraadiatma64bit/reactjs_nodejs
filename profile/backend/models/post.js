const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Post extends Model {}
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    users: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "post", // Nama tabel di database
    reezeTableName: true, // Nama tabel akan sama persis dengan nama model (admin)
    //timestamps: false, // Nonaktifkan kolom createdAt dan updatedAt
  }
);

Post.sync({ force: false })
  .then(() => {
    console.log("Model Admin berhasil disinkronkan dengan tabel");
  })
  .catch((err) => {
    console.error("Terjadi kesalahan saat menyinkronkan model Admin:", err);
  });

module.exports = Post;
