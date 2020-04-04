const admin = require("firebase-admin");
const firebase = require('../../initializer/firebase');
const db = admin.firestore();
const { createNewUser } = require('../secondaryFunctions');

const getUserByUID = (uid) => {
  return db.collection('users')
    .doc(uid)
    .get()
    .then(doc => JSON.parse(JSON.stringify(doc.data())));
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

const suscribeGenre = (uid, genre) => {
  //TODO No tener que armar el json aca
  db.collection('users').doc(uid).collection('movies-genre').doc(genre).set({ genre: genre});
}

const unsuscribeGenre = (uid, genre) => {
  return db.collection('users').doc(uid).collection('movies-genre').doc(genre).delete();
}

const getSuscribes = async (uid) => {
  const snap = await db.collection('users').doc(uid).collection('movies-genre').get();
  const suscribes = [];
  snap.forEach((suscribe_doc) => {
    suscribes.push(suscribe_doc.data());
  });
  return suscribes;
}

module.exports = {
  getUserByUID,
  unsuscribeGenre,
  getSuscribes,
  createUser,
  suscribeGenre,
  registerUser,
  getUserByEmailPassword,
};