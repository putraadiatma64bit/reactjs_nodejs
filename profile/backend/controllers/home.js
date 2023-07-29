const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const dbHelper = require("../helper/db");
const Post = require("../models/post");
const Page = require("../models/page");
const Cat = require("../models/cat");
const Slide = require("../models/slide");
const Guest = require("../models/guest");

async function postList() {
  const posts = await Post.findAll();

  // Buat array dari promise yang akan diselesaikan secara paralel
  const promises = posts.map(async (mypost) => {
    const item = mypost.toJSON();
    const catName = await dbHelper.field("name", "cat", "id", item["cat"]);
    item["catname"] = catName;
    return item;
  });

  // Jalankan operasi asinkronous paralel dan tunggu hasilnya
  const result = await Promise.all(promises);

  return result;
}
async function postListCat(cat) {
  const posts = await Post.findAll({
    where: {
      cat: cat, // ID yang ingin Anda filter
    },
  });

  // Buat array dari promise yang akan diselesaikan secara paralel
  const promises = posts.map(async (mypost) => {
    const item = mypost.toJSON();
    const catName = await dbHelper.field("name", "cat", "id", item["cat"]);
    item["catname"] = catName;
    return item;
  });

  // Jalankan operasi asinkronous paralel dan tunggu hasilnya
  const result = await Promise.all(promises);

  return result;
}
async function catList() {
  return Cat.findAll();
}
async function slideList() {
  return Slide.findAll();
}
router.get("/post/list", async (req, res) => {
  try {
    const [post, cat, slide] = await Promise.all([
      postList(),
      catList(),
      slideList(),
    ]);

    res.json({ post: post, cat: cat, slide: slide });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" + err.message });
  }
});
router.get("/post/listcat/:cat_", async (req, res) => {
  try {
    const { cat_ } = req.params;
    //console.log(cat_);
    const [post, cat] = await Promise.all([
      postListCat(cat_),
      catList(),
      slideList(),
    ]);

    res.json({ post: post, cat: cat, slide: slide });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" + err.message });
  }
});
async function postDetail(id) {
  return Post.findOne({
    where: {
      id: id, // ID yang ingin Anda filter
    },
  });
}
router.get("/post/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cat_ = await dbHelper.field("cat", "post", "id", id);
    const catName = await dbHelper.field("name", "cat", "id", cat_);

    const [post, cat] = await Promise.all([postDetail(id), catList()]);

    post.dataValues.name_cat = catName;
    res.json({ post: post, cat: cat });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

async function pageList() {
  return Page.findAll();
}
router.get("/page/list", async (req, res) => {
  try {
    const [page, cat] = await Promise.all([pageList(), catList()]);

    res.json({ page: page, cat: cat });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" + err.message });
  }
});

async function pageDetail(id) {
  return Page.findOne({
    where: {
      id: id, // ID yang ingin Anda filter
    },
  });
}

router.get("/page/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [page, cat] = await Promise.all([pageDetail(id), catList()]);

    res.json({ page: page, cat: cat });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

router.get("/cat/list", async (req, res) => {
  try {
    const [page, cat] = await Promise.all([pageList(), catList()]);

    res.json({ page: page, cat: cat });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" + err.message });
  }
});

router.get("/guest/detail", async (req, res) => {
  try {
    const [cat] = await Promise.all([catList()]);

    res.json({ cat: cat });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

const userSchema = Joi.object({
  email: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
});

router.post("/guest/save/", (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, title, content } = req.body;

  Guest.create({ email, title, content })
    .then((guest) => {
      res.status(201).json({ message: "Pengguna berhasil ditambahkan", guest });
    })
    .catch((err) => {
      res.status(500).json({ message: "Terjadi kesalahan" });
    });
});

module.exports = router;
