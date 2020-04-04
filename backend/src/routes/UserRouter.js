const { Router } = require('express');
const { executeFunction } = require('../connection');
const { checkIfAuthenticated } = require('../middleware/auth-middleware');
const UserService = require('../service/UserService');
const router = Router();

router.post('/login/google', checkIfAuthenticated, (executeFunction(['uid','photoURL','email','nickname'],(req, res) => {
  const body = req.body
  const { authToken } = req;
  const response = res.status(201).json({ uid: body.uid, idToken: authToken});
  UserService.getUserByUID(body.uid)
    .then(_ => response)
    .catch(_ => {
      UserService.createUser(body);
      return response
    });
})));

/*
  Devuelvo los datos del usuario correspondiente con el uid por parametro
*/

router.get('/:uid', (executeFunction([], (req, res) => {
  const { uid } = req.params;
  UserService.getUserByUID(uid)
    .then(response => res.status(201).json(response))
    .catch(_ => res.status(401).json('User doesn´t exist'));
})));

router.post('/:uid/suscribe', checkIfAuthenticated, (executeFunction(['genre'], (req, res) => {
  //TODO Buscar una forma de Generalizar
  const { genre } = req.body;
  const { uid } = req.params;
  //TODO Cambiar nombre de suscribirse a una lista por uno mas general
  UserService.suscribeGenre(uid, genre);
  res.status(201).json("OK");
})));

router.post('/:uid/unsuscribe', checkIfAuthenticated, (executeFunction(['genre'], (req, res) => {
  //TODO Buscar una forma de Generalizar
  const { genre } = req.body;
  const { uid } = req.params;
  //TODO Cambiar el nombre
  UserService.unsuscribeGenre(uid, genre);
  res.status(201).json("OK");
})));

router.get('/:uid/suscribes', (executeFunction([], async (req, res) => {
  //TODO Buscar una forma de Generalizar
  const { uid } = req.params;
  const moviesGenres = await UserService.getSuscribes(uid);
  res.status(201).json(moviesGenres);
})));

/*
  Registro a un usuario y lo guardo en firebase y devuelvo su uid y su idToken
*/
router.post('/register', (executeFunction(['email', 'nickname', 'password'],(req, res) => {
  UserService.registerUser(req.body)
    .then((response) => res.status(201).json(response))
    .catch((_) => { res.status(401).json({ error: 'Email already exist' });
  });
})));

/*
  El usuario ingresa si es correcto y devuelvo su uid y idToken
*/
router.post('/login', (executeFunction(['email', 'password'], (req, res) => {
  UserService.logInWithEmailPassword(req.body)
    .then(response => res.status(201).json(response))
    .catch((_) => res.status(401).json({ error: 'Email or Password is incorrect' }));
})));

module.exports = router;