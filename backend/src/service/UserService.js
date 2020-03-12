const UserDAOFirebase = require('../persistence/UserDAOFirebase');

const getUserByUID = (uid) => {
  return UserDAOFirebase.getUserByUID(uid);
}

const createUser = (data) => {
  const newUser = {
    uid: data.uid,
    nickname: data.nickname,
    email: data.email,
    photoURL: data.photoURL,
  }
  UserDAOFirebase.createUser(newUser);
}

module.exports = {
  getUserByUID,
  createUser,
};