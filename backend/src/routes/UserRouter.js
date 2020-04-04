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

router.post('/:uid/suscribe', checkIfAuthenticated, (executeFunction(['type', 'uid_type'], (req, res) => {
  const { uid_type } = req.body;
  const { type } = req.query;
  const { uid } = req.params;
  UserService.suscribeTo(uid, type, uid_type);
  res.status(201).json("OK");
})));

router.post('/:uid/unsuscribe', checkIfAuthenticated, (executeFunction(['type', 'uid_type'], (req, res) => {
  const { uid_type } = req.body;
  const { type } = req.query;
  const { uid } = req.params;
  UserService.unsuscribeTo(uid, type, uid_type);
  res.status(201).json("OK");
})));

router.get('/:uid/suscribes', (executeFunction(['type'], async (req, res) => {
  const { uid } = req.params;
  const { type } = req.query;
  const subscriptions = await UserService.getSubscriptions(uid, type);
  res.status(201).json(subscriptions);
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