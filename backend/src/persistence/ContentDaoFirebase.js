const admin = require("firebase-admin");
const db = admin.firestore();

const getContents = (content, genre, lastLimit, limit) => {
  return db.collection(content)
    .where('genres', 'array-contains', genre)
    .orderBy('date', 'asc')
    .limit(limit)
    .offset(lastLimit)
    .get()
    .then((snap) => {
      const content = [];
      snap.forEach((doc) => {
        content.push(doc.data())
      })
      return content;
    })
}

const getLastContents = (content, lastLimit, limit) => {
  return db.collection(content)
    .orderBy('date', 'asc')
    .limit(limit)
    .offset(lastLimit)
    .get()
    .then((snap) => {
      const content = [];
      snap.forEach((doc) => {
        content.push(doc.data())
      })
      return content;
    })
}

module.exports = {
  getContents,
  getLastContents,
}