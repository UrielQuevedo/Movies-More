const admin = require("firebase-admin");
const db = admin.firestore();

const getContents = (content, genre, lastLimit, limit) => {
  return db.collection(content)
    .where('genres', 'array-contains', genre)
    .orderBy('upload_date', 'desc')
    .offset(lastLimit)
    .limit(limit)
    .get()
    .then((snap) => {
      const content = [];
      snap.forEach((content_doc) => {
        content.push({...content_doc.data(), uid: content_doc.id});
      })
      return content;
    })
}

const getLastContents = (content, lastLimit, limit) => {
  return db.collection(content)
    .orderBy('upload_date', 'desc')
    .offset(lastLimit)
    .limit(limit)
    .get()
    .then((snap) => {
      const contents = [];
      snap.forEach((content_doc) => {
        contents.push({...content_doc.data(), uid: content_doc.id});
      })
      return contents;
    })
}

module.exports = {
  getContents,
  getLastContents,
}