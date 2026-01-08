// data.js
const users = {}; // { username: { password: hashedPassword } }

const books = {
  "978-3-16-148410-0": {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    reviews: {} // { username: review }
  },
  "978-0-452-28423-4": {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    reviews: {}
  }
};

module.exports = { users, books };
