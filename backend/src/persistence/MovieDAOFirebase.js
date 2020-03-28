const admin = require("firebase-admin");
const db = admin.firestore();

const addMovie = (movie) => {
  db.collection('movies').add(movie);
}

module.exports = {
  getMovies,
  addMovie,
};