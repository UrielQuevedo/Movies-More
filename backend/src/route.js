const { Router } = require('express');
const connection = require('../src/connection');
const router = Router();
const firebase = require('../initializer/firebase');
const User = require('../src/classes/user');
const rp = require('request-promise');

/*
  Creo a un usuario y lo guardo en firebase
*/
router.post('/user/create', (connection.executeFunction(['email', 'password'],(db, req, res) => {
  const body = req.body
  firebase.auth().createUserWithEmailAndPassword(body.email, body.password)
    .then((data) => {
      const user = data.user;
      const newUser = new User(user.uid, body.nickname, user.email, user.photoURL);
      db.collection('users').add(JSON.parse(JSON.stringify(newUser)));
      res.status(201).json(newUser);
    })
    .catch((_) => res.status(401).json({ error: 'Email already exist '}));
})));

/*
  El usuario ingresa si es correcto y lo devuelvo con su key
*/
router.post('/login', (connection.executeFunction(['email', 'password'], (_, req, res) => {
  const body = req.body
  firebase.auth().signInWithEmailAndPassword(body.email, body.password)
    .then((user) => res.status(201).json(user))
    .catch((_) => res.status(401).json({ error: 'Email or Password is incorrect' }));
})));

router.get('/movies', (connection.executeFunction([], (db, req, res) => {
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