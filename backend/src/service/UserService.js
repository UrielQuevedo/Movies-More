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

module.exports = {
  getUserByUID,
  createUser,
  registerUser,
  logInWithEmailPassword,
};