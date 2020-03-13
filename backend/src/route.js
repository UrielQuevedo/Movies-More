const { Router } = require('express');
const { executeFunction, db} = require('../src/connection');
const { checkIfAuthenticated } = require('./middleware/auth-middleware');
const router = Router();
const firebase = require('../initializer/firebase');
const UserService = require('./service/UserService');

router.post('/user/login/google', checkIfAuthenticated, (executeFunction(['uid','photoURL','email','nickname'],(req, res) => {
  const body = req.body
  const { authToken } = req;
  const response = res.status(201).json({ uid: body.uid, idToken: authToken});
  UserService.getUserByUID(body.uid)
    .then(_ => response)
    .catch(_ => {
      UserService.createUser(body);
      response
    });
})));

/*
  Devuelvo los datos del usuario correspondiente con el uid por parametro
*/

router.get('/user/:uid', (executeFunction([], (req, res) => {
  const { uid } = req.params;
  UserService.getUserByUID(uid)
    .then(doc => res.status(201).json(JSON.parse(JSON.stringify(doc.data()))))
    .catch(_ => res.status(401).json('User doesn´t exist'));
})));

/*
  Registro a un usuario y lo guardo en firebase y devuelvo su uid y su idToken
*/
router.post('/user/register', (executeFunction(['email', 'nickname', 'password'],(req, res) => {
  UserService.registerUser(req.body)
    .then((response) => res.status(201).json(response))
    .catch((_) => { res.status(401).json({ error: 'Email already exist' });
  });
})));

/*
  El usuario ingresa si es correcto y devuelvo su uid y idToken
*/
router.post('/user/login', (executeFunction(['email', 'password'], (req, res) => {
  UserService.logInWithEmailPassword(req.body)
    .then(response => res.status(201).json(response))
    .catch((_) => res.status(401).json({ error: 'Email or Password is incorrect' }));
})));

router.get('/movies', (executeFunction([], (req, res) => {
  db.collection("movies")
    .get()
    .then((snap) => {
      movies = [];
      snap.forEach(doc => {
        movies.push(doc.data());
      });
      res.status(200).json(movies);
    })
    .catch((error) => console.log(error))
})));

module.exports = router;