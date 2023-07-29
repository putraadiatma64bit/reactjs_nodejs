require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const authenticate = require("./filter/authenticate");
const home = require("./controllers/home");
const register = require("./controllers/register");
const login = require("./controllers/login");
const page = require("./controllers/page");
const cat = require("./controllers/cat");
const post = require("./controllers/post");
const users = require("./controllers/users");
const profile = require("./controllers/profile");

const slide = require("./controllers/slide");
const guest = require("./controllers/guest");

app.use(bodyParser.json());
app.use(cors());

// Middleware untuk autentikasi menggunakan JWT
//app.use(authenticate);

app.use("/uploads", express.static("uploads"));

app.use("/home", home);

app.use("/register", register);
app.use("/login", login);

app.use("/users", authenticate, users);
app.use("/profile", authenticate, profile);

app.use("/page", authenticate, page);
app.use("/cat", authenticate, cat);
app.use("/post", authenticate, post);

app.use("/slide", authenticate, slide);
app.use("/guest", authenticate, guest);

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan pada port ${process.env.PORT}`);
});
