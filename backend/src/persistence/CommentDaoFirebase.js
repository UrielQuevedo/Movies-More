const admin = require("firebase-admin");
const db = admin.firestore();

//TODO Probar y reemplazar esto si funciona
const commentRef = (content_collection, uidContent) => {
  return db.collection(content_collection).doc(uidContent).collection('comments');
}

const addComment = async (content_collection, uidContent, comment) => {
  const comment = await db.collection(content_collection)
    .doc(uidContent)
    .collection('comments')
    .add(comment);

  return comment.id;
}

const removeComment = (content_collection, uidContent, uidComment) => {
  db.collection(content_collection)
    .doc(uidContent)
    .collection('comments')
    .doc(uidComment)
    .delete();

  return uidComment;
}

const getComments = async (content_collection, uidContent) => {
  const comments = [];
  const comment_snap = await db.collection(content_collection)
    .doc(uidContent)
    .collection('comments')
    .get();

  comment_snap.forEach((comment_data) => {
    comments.push({ ...comment_data.data(), uid: comment_data.id });
  })

  return comments;
}

const getComment = async (content_collection, uidContent, uidComment) => {
  const comment_data = await db.collection(content_collection)
    .doc(uidContent)
    .collection('comments')
    .doc(uidComment)
    .get();

  return comment_data.data();
}


module.exports = {
  addComment,
  removeComment,
  getComments,
  getComment,
}
