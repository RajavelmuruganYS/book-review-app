// routes/books.js
const express = require("express");
const router = express.Router();
const { books } = require("../data");
const { authenticateJWT } = require("../middleware/auth");


// Get all books (async version)
router.get("/", async (req, res) => {
  // Simulate an async operation (like fetching from DB)
  const fetchBooks = () => new Promise((resolve) => setTimeout(() => resolve(books), 100));
  
  const allBooks = await fetchBooks(); // wait for “DB” to respond
  res.json(allBooks);
});


// Search by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Search by author/title
router.get("/search", (req, res) => {
  const { author, title } = req.query;
  const result = {};
  Object.keys(books).forEach((isbn) => {
    if (
      (author && books[isbn].author.toLowerCase().includes(author.toLowerCase())) ||
      (title && books[isbn].title.toLowerCase().includes(title.toLowerCase()))
    ) {
      result[isbn] = books[isbn];
    }
  });
  res.json(result);
});

// Add or modify review (authenticated)
router.post("/review/:isbn", authenticateJWT, (req, res) => {
  const { review } = req.body;
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews[req.user.username] = review;
  res.json({ message: "Review added/updated", reviews: book.reviews });
});

// Delete review (authenticated)
router.delete("/review/:isbn", authenticateJWT, (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });

  delete book.reviews[req.user.username];
  res.json({ message: "Review deleted", reviews: book.reviews });
});

module.exports = router;
