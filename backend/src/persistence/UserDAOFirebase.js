const admin = require("firebase-admin");
const db = admin.firestore();

const getUserByUID = (uid) => {
  return db.collection('users')
    .doc(uid)
    .get();
}

const createUser = (user) => {
  db.collection('users').doc(user.uid).set(user);
}

module.exports = {
  getUserByUID,
  createUser,
};