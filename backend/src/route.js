const { Router } = require('express');
const { executeFunction, db} = require('../src/connection');
const { checkIfAuthenticated } = require('./middleware/auth-middleware');
const router = Router();
const firebase = require('../initializer/firebase');
const UserService = require('./service/UserService');

router.post('/user/verify', checkIfAuthenticated, (executeFunction([],(req, res) => {
  res.status(201).json("SI");
})));

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
  const body = req.body

  UserService.registerUser(body.email, body.password)
    .then((data) => {
      const dataUser = data.user;
      dataUser.nickname = body.nickname;
      UserService.createUser(data);
      dataUser.getIdToken().then(token => res.status(201).json({ uid: dataUser.uid, idToken: token }));
    })
    .catch((_) => res.status(401).json({ error: 'Email already exist' }));

  // firebase.auth().createUserWithEmailAndPassword(body.email, body.password)
  //   .then((data) => {
  //     const dataUser = data.user;
  //     const newUser = {
  //       uid: dataUser.uid,
  //       nickname: body.nickname,
  //       email: dataUser.email,
  //       photoURL: 'https://i.pinimg.com/originals/ff/1d/9f/ff1d9fa54fe863f412d298441f4d3208.jpg',
  //     }
  //     db.collection('users').doc(dataUser.uid).set(newUser);
  //     dataUser.getIdToken().then(token => res.status(201).json({ uid: dataUser.uid, idToken: token }));
  //   })
  //   .catch((_) => res.status(401).json({ error: 'Email already exist' }));
})));

/*
  El usuario ingresa si es correcto y devuelvo su uid y idToken
*/
router.post('/user/login', (executeFunction(['email', 'password'], (req, res) => {
  const body = req.body
  firebase.auth().signInWithEmailAndPassword(body.email, body.password)
    .then((data) => {
      const user = data.user
      user.getIdToken(true).then((token) => res.status(201).json({ uid: user.uid, idToken: token}));
    })
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