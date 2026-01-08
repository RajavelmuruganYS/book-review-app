const axios = require('axios');

async function getAllBooks() {
  try {
    const response = await axios.get('http://localhost:3000/books');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getAllBooks();
