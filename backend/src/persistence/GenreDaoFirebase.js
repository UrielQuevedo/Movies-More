const admin = require("firebase-admin");
const db = admin.firestore();

const addGenres = (genres) => {
  db.collection('genres').doc('movies').set({'genres': genres  });
}

const getGenres = (content) => {
  return db.collection('genres')
    .doc(content)
    .get()
    .then(doc => JSON.parse(JSON.stringify(doc.data())));
}

module.exports = {
  addGenres,
  getGenres,
};