const admin = require("firebase-admin");
const db = admin.firestore();
const collection = db.collection('trailers');

const getTrailer = (uid) => {
  return collection.doc(uid)
    .get()
    .then((doc) => JSON.parse(JSON.stringify(doc.data())));
}

module.exports = {
  getTrailer,
};