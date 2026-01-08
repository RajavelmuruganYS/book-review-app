// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

// Default
app.get("/", (req, res) => {
  res.send("Book Review Application API Running");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
