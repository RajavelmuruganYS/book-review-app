const axios = require("axios");

// Get all books
async function getAllBooks() {
  const response = await axios.get("http://localhost:3000/books");
  console.log("All Books:", response.data);
}

// Get book by ISBN
async function getBookByISBN(isbn) {
  const response = await axios.get(`http://localhost:3000/books/isbn/${isbn}`);
  console.log("Book by ISBN:", response.data);
}

// Get books by author
async function getBooksByAuthor(author) {
  const response = await axios.get(`http://localhost:3000/books/search?author=${author}`);
  console.log("Books by Author:", response.data);
}

// Get books by title
async function getBooksByTitle(title) {
  const response = await axios.get(`http://localhost:3000/books/search?title=${title}`);
  console.log("Books by Title:", response.data);
}

// Call functions
getAllBooks();
getBookByISBN("978-3-16-148410-0");
getBooksByAuthor("Fitzgerald");
getBooksByTitle("Gatsby");
