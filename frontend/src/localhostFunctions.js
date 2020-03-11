const logIn = (data) => {
  window.localStorage.setItem('idToken', data.idToken);
  window.localStorage.setItem('uid', data.uid);
  window.location.href = '/';
}

module.exports = {
  logIn
};