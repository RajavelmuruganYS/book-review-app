// middleware/auth.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey123"; // use env variable in real apps

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = { authenticateJWT, SECRET_KEY };
