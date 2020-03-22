const admin = require("firebase-admin");
const db = admin.firestore();

const addGenres = (genres) => {
  db.collection('genres').doc('movies').set({'genres': genres  });
}

module.exports = {
  addGenres,
};