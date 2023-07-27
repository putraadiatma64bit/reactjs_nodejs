const express = require("express");
const router = express.Router();
const Joi = require("joi");
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
  if (!req.user.role.includes("users")) {
    return res.status(403).json({ message: "Akses ditolak" });
  }
  next();
}

// Rute GET untuk pengguna
router.get("/", authorizeUser, (req, res) => {
  const key = req.query["key"];
  let query = {};
  if (key.length > 0)
    query = {
      where: {
        name: {
          [Op.like]: `%${key}%`,
        },
      },
    };
  Users.findAll(query)
    .then((cat) => {
      res.json(cat);
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

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

// Rute POST untuk pengguna
router.post("/save/", authorizeUser, (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan" });
    }
    Users.create({ username, password: hashedPassword, role })
      .then((page) => {
        res
          .status(201)
          .json({ message: "Pengguna berhasil ditambahkan", page });
      })
      .catch((err) => {
        res.status(500).json({ message: "Terjadi kesalahan" });
      });
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

// Rute DELETE untuk pengguna
router.delete("/delete/:id", authorizeUser, (req, res) => {
  const { id } = req.params;

  Users.destroy({ where: { id } })
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }
      res.json({ message: "Pengguna berhasil dihapus" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

module.exports = router;
