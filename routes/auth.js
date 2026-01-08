// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const { users } = require("../data");
const { SECRET_KEY } = require("../middleware/auth");

// Session setup for this router
router.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: true }));

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });
  if (users[username]) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };
  res.json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Incorrect password" });

  // Create JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  req.session.user = username; // session
  res.json({ message: "Logged in successfully", token });
});

module.exports = router;
