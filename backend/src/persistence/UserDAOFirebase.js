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

const registerUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password); 
}

const getUserByEmailPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

module.exports = {
  getUserByUID,
  createUser,
  registerUser,
  getUserByEmailPassword,
};