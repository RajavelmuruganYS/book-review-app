const axios = require("axios");

async function getAllBooks() {
  try {
    const res = await axios.get("http://localhost:3000/books");
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
}

async function getBookByISBN(isbn) {
  try {
    const res = await axios.get(`http://localhost:3000/books/isbn/${isbn}`);
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
}

async function getBooksByAuthor(author) {
  try {
    const res = await axios.get(`http://localhost:3000/books/search?author=${author}`);
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
}

async function getBooksByTitle(title) {
  try {
    const res = await axios.get(`http://localhost:3000/books/search?title=${title}`);
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
}

getAllBooks();
getBookByISBN("978-3-16-148410-0");
getBooksByAuthor("Fitzgerald");
getBooksByTitle("Gatsby");
