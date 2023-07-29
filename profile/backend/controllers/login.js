const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/users");

// Skema validasi menggunakan Joi
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/", (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password } = req.body;

  // Cari pengguna berdasarkan username
  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Username atau password salah" });
      }

      // Periksa password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res
            .status(401)
            .json({ message: "Username atau password salah" });
        }

        // Buat token JWT
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET,
          {
            //expiresIn: '1h' // atau 3600
          }
        );

        // Kirim token sebagai respons
        res.json({ token: token, users: user.id });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

module.exports = router;
