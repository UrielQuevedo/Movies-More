const UserDAOFirebase = require('../persistence/UserDAOFirebase');
const DEFAULT_IMAGE = 'https://i.pinimg.com/originals/ff/1d/9f/ff1d9fa54fe863f412d298441f4d3208.jpg';

const getUserByUID = (uid) => {
  return UserDAOFirebase.getUserByUID(uid);
}

const createUser = (data) => {
  if (!data.photoURL) {
    data.photoURL = DEFAULT_IMAGE;
  }
  const newUser = {
    uid: data.uid,
    nickname: data.nickname,
    email: data.email,
    photoURL: data.photoURL,
  }
  UserDAOFirebase.createUser(newUser);
}

const registerUser = (data) => {
  return UserDAOFirebase.registerUser(data.email, data.password);
}

module.exports = {
  getUserByUID,
  createUser,
  registerUser,
};