class User {
  constructor(_uid, _nickname, _email, _photoURL) {
    this.uid = _uid;
    this.nickname = _nickname;
    this.email = _email;
    this.photoURL = _photoURL;
  }

  toJSON() {
    let {uid, nickname, email, photoURL} = this;
    return {uid, nickname, email, photoURL};
  }
}

module.exports = User;