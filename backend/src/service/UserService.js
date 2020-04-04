const UserDAOFirebase = require('../persistence/UserDAOFirebase');
const { createNewUser } = require('../secondaryFunctions');

const getUserByUID = (uid) => {
  return UserDAOFirebase.getUserByUID(uid);
}

const createUser = (data) => {
  const newUser = createNewUser(data);
  UserDAOFirebase.createUser(newUser);
}

const registerUser = (data) => {
  return UserDAOFirebase.registerUser(data.email, data.password, data.nickname);
}

const logInWithEmailPassword = (data) => {
  return UserDAOFirebase.getUserByEmailPassword(data.email, data.password);
}

const suscribeGenre = (uid, genre) => {
  UserDAOFirebase.suscribeGenre(uid, genre);
}

const unsuscribeGenre = (uid, genre) => {
  return UserDAOFirebase.unsuscribeGenre(uid, genre);
}

const getSuscribes = (uid) => {
  return UserDAOFirebase.getSuscribes(uid);
}

module.exports = {
  getUserByUID,
  unsuscribeGenre,
  getSuscribes,
  createUser,
  suscribeGenre,
  registerUser,
  logInWithEmailPassword,
};