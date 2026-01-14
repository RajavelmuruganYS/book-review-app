// general.js
const axios = require("axios");

const BASE_URL = "http://localhost:3000";

/**
 * Get all books
 */
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all books");
  }
}

/**
 * Get book by ISBN
 */
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/books/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    throw new Error(`Book with ISBN ${isbn} not found`);
  }
}

/**
 * Get books by author
 */
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(
      `${BASE_URL}/books/search?author=${author}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Books by author ${author} not found`);
  }
}

/**
 * Get books by title
 */
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(
      `${BASE_URL}/books/search?title=${title}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Books with title ${title} not found`);
  }
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
