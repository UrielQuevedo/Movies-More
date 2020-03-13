const admin = require("firebase-admin");
const db = admin.firestore();

const getMovies = () => {
  return db.collection("movies")
    .get()
    .then((snap) => {
      let movies = [];
      snap.forEach(doc => {
        movies.push(doc.data());
      })
      return movies;
    });
}

module.exports = {
  getMovies,
};