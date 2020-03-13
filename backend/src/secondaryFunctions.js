const DEFAULT_IMAGE = 'https://i.pinimg.com/originals/ff/1d/9f/ff1d9fa54fe863f412d298441f4d3208.jpg';

const createNewUser = (data) => {
  if (!data.photoURL) {
    data.photoURL = DEFAULT_IMAGE;
  }
  const newUser = {
    uid: data.uid,
    nickname: data.nickname,
    email: data.email,
    photoURL: data.photoURL,
  }
  return newUser;
}

module.exports = {
  createNewUser,
};