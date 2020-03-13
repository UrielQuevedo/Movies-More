const admin = require("firebase-admin");
const firebase = require('../../initializer/firebase');
const db = admin.firestore();
const { createNewUser } = require('../secondaryFunctions');

const getUserByUID = (uid) => {
  return db.collection('users')
    .doc(uid)
    .get();
}

const createUser = (user) => {
  db.collection('users').doc(user.uid).set(user);
}

const registerUser = (email, password, nickname) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((data) => {
            const objectUser = data.user;
            const dataUser = JSON.parse(JSON.stringify(objectUser));
            dataUser.nickname = nickname;
            createUser(createNewUser(dataUser));
            return objectUser
              .getIdToken()
              .then(token => {
                return { idToken: token, uid: dataUser.uid}
              });
          });
}

const getUserByEmailPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      const objectUser = data.user;
      return objectUser
        .getIdToken(true)
        .then(token => {
          return { idToken: token, uid: objectUser.uid }
        });
    });
}

module.exports = {
  getUserByUID,
  createUser,
  registerUser,
  getUserByEmailPassword,
};