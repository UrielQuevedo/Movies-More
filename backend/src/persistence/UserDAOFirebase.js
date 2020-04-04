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
  //TODO Mejorar esto
  db.collection('users').doc(uid).collection('suscribes').doc('movies').update({ genres: admin.firestore.FieldValue.arrayUnion(genre) })
    .catch(_ => db.collection('users').doc(uid).collection('suscribes').doc('movies').set({ genres: admin.firestore.FieldValue.arrayUnion(genre) }))
}

const unsuscribeGenre = (uid, genre) => {
  return db.collection('users').doc(uid).collection('suscribes').doc('movies').update({ genres: admin.firestore.FieldValue.arrayRemove(genre)});
}

const getSuscribes = async (uid) => {
  const suscribe_movies = await db.collection('users').doc(uid).collection('suscribes').doc('movies').get();
  return suscribe_movies.data().genres;
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