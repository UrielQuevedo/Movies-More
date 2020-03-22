const admin = require("firebase-admin");
const serviceAccount = require('../moviesandmore-df541-firebase-adminsdk-cokmn-1a1bd2499c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moviesandmore-df541.firebaseio.com"
});;

function isNotUndefined(value) {
  return value !== undefined;
}

function executeFunction(params,func) {
  return function (req, res) {
    if (params.every(p => isNotUndefined(req.query[p]) || isNotUndefined(req.body[p]))) {
      try {
        func(req, res);
      } catch (error) {
        console.log(error)
        catchError(error, res);
      }
    } else {
      res.status(400).json({status:400, errorCode:'BAD_REQUEST'});
    }
  };
}

function catchError(error, res) {
  errors[error.name](res);
}
  
const errors = {
};

module.exports = {
  executeFunction,
};