const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const Users = require("../models/users");

// Skema validasi menggunakan Joi
const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

// Middleware untuk otorisasi pengguna
function authorizeUser(req, res, next) {
  if (!req.user.role.includes("profile")) {
    return res.status(403).json({ message: "Akses ditolak" });
  }
  next();
}


router.get("/edit/:id", authorizeUser, (req, res) => {
  const { id } = req.params;
  Users.findOne({
    where: {
      id: id, // ID yang ingin Anda filter
    },
  })
    .then((page) => {
      res.json(page);
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

// Rute PUT untuk pengguna
router.put("/update/:id", authorizeUser, (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan" });
    }

    Users.update(
      { username, password: hashedPassword, role },
      { where: { id } }
    )
      .then((result) => {
        if (result[0] === 0) {
          return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }
        res.json({ message: "Pengguna berhasil diperbarui" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Terjadi kesalahan" });
      });
  });
});

module.exports = router;
