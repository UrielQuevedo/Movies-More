const { Router } = require('express');
const { executeFunction, db, admin} = require('../src/connection');
const router = Router();
const firebase = require('../initializer/firebase');
const User = require('../src/classes/user');
const rp = require('request-promise');

router.post('/user/verify', (executeFunction([],(req, res) => {
  const body = req.body
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    const uid = decodedToken.uid;
    console.log(uid);
    res.status(201).json("SI");
  }).catch(function(error) {
    res.status(201).json("NO");
  });
})));

router.post('/user/googleLogIn', (executeFunction(['uid','photoURL','email','nickname'],(req, res) => {
  const body = req.body
  const accessToken = req.headers.authorization.split(" ")[1];

  admin.auth().verifyIdToken(accessToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      if(uid === body.uid)  {
        db.collection('users')
          .doc(uid)
          .get()
          .then(doc => res.status(201).json(JSON.parse(JSON.stringify(doc.data()))))
          .catch(/* LO CREO */);      
      } else {
        //LOS UID NO COINCIDEN
      }
    })
    .catch();

  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    const uid = decodedToken.uid;
    console.log(uid);
    res.status(201).json("SI");
  }).catch(function(error) {
    res.status(201).json("NO");
  });
})));

/*
  Devuelvo los datos del usuario correspondiente con el uid por parametro
*/

router.get('/user/:uid', (executeFunction([], (req, res) => {
  const { uid } = req.params;
  db.collection('users')
    .doc(uid)
    .get()
    .then(doc => res.status(201).json(JSON.parse(JSON.stringify(doc.data()))))
    .catch(_ => res.status(401).json({ error: "User does't exist" }));
})));

/*
  Registro a un usuario y lo guardo en firebase y devuelvo su uid y su accessToken
*/
router.post('/user/register', (executeFunction(['email', 'nickname', 'password'],(req, res) => {
  const body = req.body
  firebase.auth().createUserWithEmailAndPassword(body.email, body.password)
    .then((data) => {
      const dataUser = data.user;
      const newUser = {
        uid: dataUser.uid,
        nickname: body.nickname,
        email: dataUser.email,
        photoURL: 'https://i.pinimg.com/originals/ff/1d/9f/ff1d9fa54fe863f412d298441f4d3208.jpg',
      }
      db.collection('users').doc(dataUser.uid).set(newUser);
      dataUser.getIdToken().then(token => res.status(201).json({ uid: dataUser.uid, accessToken: token }));
    })
    .catch((error) => res.status(401).json({ error: error }));
})));

/*
  El usuario ingresa si es correcto y devuelvo su uid y accessToken
*/
router.post('/login', (executeFunction(['email', 'password'], (req, res) => {
  const body = req.body
  firebase.auth().signInWithEmailAndPassword(body.email, body.password)
    .then((data) => {
      const user = data.user
      user.getIdToken().then((token) => res.status(201).json({ uid: user.uid, accessToken: token}));
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