const admin = require("firebase-admin");
const db = admin.firestore();
const moviesRef = db.collection('movies');

const addMovie = (movie) => {
  moviesRef('movies').add(movie);
}

const getMovie = async (movieUid) => {
  const movie_doc = await moviesRef.doc(movieUid).get();
  return movie_doc.data();
}

module.exports = {
  addMovie,
  getMovie,
};