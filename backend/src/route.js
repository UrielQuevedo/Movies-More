const { Router } = require('express');
const connection = require('../src/connection');
const router = Router();
const firebase = require('firebase');

firebase.initializeApp({
  apiKey: "AIzaSyDjA-znwghydUMgqux3K1hPOoJAtE3B-zo",
  authDomain: "moviesandmore-df541.firebaseapp.com",
  databaseURL: "https://moviesandmore-df541.firebaseio.com",
  projectId: "moviesandmore-df541",
  storageBucket: "moviesandmore-df541.appspot.com",
  messagingSenderId: "100996449146",
  appId: "1:100996449146:web:9f72cfeb5520a7f9e6ccc3",
  measurementId: "G-2TFYNEHRMP"
});

router.get('/user/:id', (req, res) => {
    res.status(200).json();
});

router.post('/newUser', (connection.executeFunction(['email', 'password'],(_, req, res) => {
  const body = req.body
  firebase.auth().createUserWithEmailAndPassword(body.email, body.password)
    .then((user) => console.log(user))
    .catch((error) => console.log(error));
  res.status(201).json("OK");
})));

router.post('/login', (connection.executeFunction(['email', 'password'], (_, req, res) => {
  const body = req.body
  firebase.auth().signInWithEmailAndPassword(body.email, body.password)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  res.status(201).json("OK");
})));

module.exports = router;