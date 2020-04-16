const logIn = (data) => {
  window.localStorage.setItem('idToken', data.idToken);
  window.localStorage.setItem('uid', data.uid);
  window.location.href = '/';
}

const getIdToken = () => {
  return window.localStorage.getItem('idToken');
}

module.exports = {
  logIn,
  getIdToken,
};