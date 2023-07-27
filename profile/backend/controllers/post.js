const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const multer = require("multer"); 
const path = require('path');

const dbHelper = require("../helper/db");
const Post = require("../models/post");
const Cat = require("../models/cat");

// Skema validasi menggunakan Joi
const userSchema = Joi.object({
  cat: Joi.number().required(),
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
  if (!req.user.role.includes("post")) {
    return res.status(403).json({ message: "Akses ditolak" });
  }
  next();
}

// Rute GET untuk pengguna
/*router.get("/", authorizeUser, (req, res) => {
  Post.findAll()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});*/
router.get("/", authorizeUser, async (req, res) => {
  try {
    const posts = await Post.findAll();

    const editedPostPromises = posts.map(async (mypost) => {
      const item = mypost.toJSON();
      const catName = await dbHelper.field("name", "cat", "id", item["cat"]);
      item["catname"] = catName;
      return item;
    });

    const editedPosts = await Promise.all(editedPostPromises);
    console.log(editedPosts);
    res.json(editedPosts);
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

async function findPostById(id) {
  return Post.findOne({
    where: {
      id: id, // ID yang ingin Anda filter
    },
  });
}

async function findCategories(cat) {
  return Cat.findAll({
    where: {
      id: {
        [Op.ne]: cat,
      },
    },
  });
}

async function findAllCategories() {
  return Cat.findAll();
}

router.get("/add/", authorizeUser, async (req, res) => {
  try {
    const [categories] = await Promise.all([findAllCategories()]);

    res.json({ allCat: categories });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" + err.message });
  }
});
router.get("/edit/:id", authorizeUser, async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await dbHelper.field("cat", "post", "id", id);
    const catName = await dbHelper.field("name", "cat", "id", cat);
    const [post, categories] = await Promise.all([
      findPostById(id),
      findCategories(cat),
    ]);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //console.log(catName);
    post.dataValues.name_cat = catName;

    res.json({ rowPost: post, cat: categories });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" + err.message });
  }
});

// Rute POST untuk pengguna
router.post("/save/", authorizeUser, upload.single('photo'), (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { cat, title, content, users } = req.body;
  const photo = req.file ? req.file.filename : null;

  Post.create({ cat, title, photo, content, users })
    .then((post) => {
      res.status(201).json({ message: "Pengguna berhasil ditambahkan", post });
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

// Rute POST untuk pengguna
router.post("/update/:id", authorizeUser, upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { cat, title, content } = req.body;
  const photo = req.file ? req.file.filename : null;

  let updateData = { cat, title, content };
  if (photo) {
    updateData.photo = photo;
  }

  Post.update(updateData, { where: { id } })
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

  Post.destroy({ where: { id } })
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
