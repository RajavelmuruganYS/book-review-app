const axios = require("axios");

const BASE_URL = "http://localhost:3000/books";

// Get all books
async function getAllBooks() {
  try {
    const response = await axios.get(BASE_URL);
    console.log("All Books:", response.data);
  } catch (error) {
    console.error("Error fetching all books:", error.response?.data || error.message);
  }
}

// Get book by ISBN
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log(`Book with ISBN ${isbn}:`, response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      console.error("Book not found for ISBN:", isbn);
    } else {
      console.error("Error fetching book by ISBN:", error.message);
    }
  }
}

// Get books by author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/search?author=${author}`);
    console.log(`Books by author ${author}:`, response.data);
  } catch (error) {
    console.error("Error fetching books by author:", error.response?.data || error.message);
  }
}

// Get books by title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/search?title=${title}`);
    console.log(`Books with title ${title}:`, response.data);
  } catch (error) {
    console.error("Error fetching books by title:", error.response?.data || error.message);
  }
}

// Example calls (for testing)
getAllBooks();
getBookByISBN("1");
getBooksByAuthor("Author A");
getBooksByTitle("Book");
