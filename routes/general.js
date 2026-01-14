const axios = require("axios");

// Get all books
async function getAllBooks() {
  const res = await axios.get("http://localhost:3000/books");
  return res.data;
}

// Get book by ISBN
async function getBookByISBN(isbn) {
  const res = await axios.get(`http://localhost:3000/books/isbn/${isbn}`);
  return res.data;
}

// Get books by author
async function getBooksByAuthor(author) {
  const res = await axios.get(`http://localhost:3000/books/author/${author}`);
  return res.data;
}

// Get books by title
async function getBooksByTitle(title) {
  const res = await axios.get(`http://localhost:3000/books/title/${title}`);
  return res.data;
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
