const { Router } = require('express');
const { executeFunction, db, admin} = require('../src/connection');
const { checkIfAdmin } = require('./middleware/auth-middleware');
const router = Router();
const firebase = require('../initializer/firebase');

router.post('/user/verify', checkIfAdmin, (executeFunction([],(req, res) => {
  res.status(201).json("SI");
})));

router.post('/user/googleLogIn', (executeFunction(['uid','photoURL','email','nickname'],(req, res) => {
  const body = req.body
  const idToken = req.headers.authorization.split(" ")[1];
  admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      const uid = decodedToken.uid;
      const rtn = res.status(201).json({ uid: uid, idToken: idToken});
      db.collection('users')
        .doc(uid)
        .get()
        .then(_ => rtn)
        .catch(
          _ => {
            const newUser = {
              uid: body.uid,
              nickname: body.nickname,
              email: body.email,
              photoURL: body.photoURL,
            }
            db.collection('users').doc(uid).set(newUser);
            rtn;
          }
        );   
    })
    .catch(function(error) {
      res.status(201).json(error);
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
  Registro a un usuario y lo guardo en firebase y devuelvo su uid y su idToken
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
      dataUser.getIdToken().then(token => res.status(201).json({ uid: dataUser.uid, idToken: token }));
    })
    .catch((_) => res.status(401).json({ error: 'Email already exist' }));
})));

/*
  El usuario ingresa si es correcto y devuelvo su uid y idToken
*/
router.post('/login', (executeFunction(['email', 'password'], (req, res) => {
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