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

const suscribeTo = (uid, type, uid_type) => {
  UserDAOFirebase.suscribeTo(uid, type, uid_type);
}

const unsuscribeTo = (uid, type, uid_type) => {
  return UserDAOFirebase.unsuscribeTo(uid, type, uid_type);
}

const getSubscriptions = (uid, type) => {
  return UserDAOFirebase.getSubscriptions(uid, type);
}

module.exports = {
  getUserByUID,
  unsuscribeTo,
  getSubscriptions,
  createUser,
  suscribeTo,
  registerUser,
  logInWithEmailPassword,
};