const admin = require("firebase-admin");

const getAuthToken = (req, next) => {
  if  (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
}

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, async () => {
    try {
      const { authToken } = req;
      await admin
        .auth()
        .verifyIdToken(authToken)
      next();
    } catch (_) {
      return res.status(401).json({ error: 'You are not authorized to make this request' });
    }
  });
}

module.exports = {
  checkIfAuthenticated
};