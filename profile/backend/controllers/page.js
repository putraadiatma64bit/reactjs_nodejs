const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const multer = require("multer"); 
const path = require('path');

const Page = require("../models/page");

// Skema validasi menggunakan Joi
const userSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  users: Joi.number().required(),
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Lokasi penyimpanan file (pastikan direktori 'uploads' sudah ada)
  },
  filename: function (req, file, cb) {
    // Membuat nama unik untuk file dengan menambahkan timestamp di depan nama file asli
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

// Middleware untuk otorisasi pengguna
function authorizeUser(req, res, next) {
  if (!req.user.role.includes("page")) {
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
        title: {
          [Op.like]: `%${key}%`,
        },
      },
    };
  Page.findAll(query)
    .then((page) => {
      res.json(page);
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

router.get("/edit/:id", authorizeUser, (req, res) => {
  const { id } = req.params;
  Page.findOne({
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
router.post("/save/", authorizeUser, upload.single('photo'), (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, content, users } = req.body;
  const photo = req.file ? req.file.filename : null;

  Page.create({ title, photo, content, users })
    .then((page) => {
      res.status(201).json({ message: "Pengguna berhasil ditambahkan", page });
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

// Rute POST untuk pengguna
router.post("/update/:id", authorizeUser, upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const photo = req.file ? req.file.filename : null;

  let updateData = { title, content };
  if (photo) {
    updateData.photo = photo;
  }

  Page.update(updateData, { where: { id } })
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

// Rute DELETE untuk pengguna
router.delete("/delete/:id", authorizeUser, (req, res) => {
  const { id } = req.params;

  Page.destroy({ where: { id } })
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
