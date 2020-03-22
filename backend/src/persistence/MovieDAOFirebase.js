const admin = require("firebase-admin");
const db = admin.firestore();

const getMovies = (genre, lastLimit, limit) => {
  return db.collection('movies')
    .where('genres', 'array-contains', genre)
    .orderBy('en_title')
    .limit(limit)
    .offset(lastLimit)
    .get()
    .then((snap) => {
      const movies = []
      snap.forEach((doc) => {
        movies.push(doc.data())
      })
      return movies;
    })
}

const addMovie = (movie) => {
  db.collection('movies').add(movie);
}

module.exports = {
  getMovies,
  addMovie,
};