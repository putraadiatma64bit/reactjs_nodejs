const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  // Dapatkan token dari header Authorization
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Token tidak ada" });
  }

  const tokenParts = header.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
}

module.exports = authenticate;
