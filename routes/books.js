const express = require("express");
const router = express.Router();
const { books } = require("../data");
const { authenticateJWT } = require("../middleware/auth");

// Get all books (async)
router.get("/", async (req, res) => {
  const fetchBooks = () =>
    new Promise((resolve) => setTimeout(() => resolve(books), 100));
  const allBooks = await fetchBooks();
  res.json(allBooks);
});

// Get book by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// Get reviews for a book
router.get("/isbn/:isbn/review", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (Object.keys(book.reviews).length === 0) {
    return res.json({ message: "No reviews found for this book." });
  }

  res.json({
    message: "Reviews retrieved successfully",
    reviews: book.reviews
  });
});

// Get books by author
router.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const result = [];

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].author.toLowerCase().includes(author)) {
      result.push({
        isbn,
        ...books[isbn]
      });
    }
  });

  res.json(result);
});

// Get books by title
router.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const result = [];

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].title.toLowerCase().includes(title)) {
      result.push({
        isbn,
        ...books[isbn]
      });
    }
  });

  res.json(result);
});

// Add / Modify review (PUT)
router.put("/review/:isbn", authenticateJWT, (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[req.user.username] = review;

  res.json({
    message: "Review added/updated successfully",
    reviews: books[isbn].reviews
  });
});

// Delete review
router.delete("/review/:isbn", authenticateJWT, (req, res) => {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  delete books[isbn].reviews[req.user.username];

  res.json({
    message: `Review for ISBN ${isbn} deleted`
  });
});

module.exports = router;
