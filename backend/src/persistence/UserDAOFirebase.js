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

const suscribeTo = (uid, type, uid_type) => {
  //TODO Mejorar esto
  db.collection('users').doc(uid).collection('subscriptions').doc(type).update({ subscriptions: admin.firestore.FieldValue.arrayUnion(uid_type) })
    .catch(_ => db.collection('users').doc(uid).collection('subscriptions').doc(type).set({ subscriptions: admin.firestore.FieldValue.arrayUnion(uid_type) }))
}

const unsuscribeTo = (uid, type, uid_type) => {
  return db.collection('users').doc(uid).collection('subscriptions').doc(type).update({ subscriptions: admin.firestore.FieldValue.arrayRemove(uid_type)});
}

const getSubscriptions = async (uid, type) => {
  const suscribe_movies = await db.collection('users').doc(uid).collection('subscriptions').doc(type).get();
  return suscribe_movies.data().subscriptions;
}

module.exports = {
  getUserByUID,
  unsuscribeTo,
  getSubscriptions,
  createUser,
  suscribeTo,
  registerUser,
  getUserByEmailPassword,
};