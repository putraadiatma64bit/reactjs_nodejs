const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Users = require("../models/users");

// Skema validasi menggunakan Joi
const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

router.post("/", (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password } = req.body;

  // Enkripsi password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan" });
    }

    // Simpan pengguna ke database
    Users.create({
      username,
      password: hashedPassword,
      role: "users",
    })
      .then((user) => {
        res.status(201).json({ message: "Pendaftaran berhasil" });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  });
});

module.exports = router;
