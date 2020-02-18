const { Router } = require('express');
const connection = require('../src/connection');
const router = Router();

router.get('/user/:id', (req, res) => {
    res.status(200).json();
});

router.post('/newUser', (connection.executeFunction(['firstName', 'lastName'],(db, req, res) => {
  db.ref('users').push(req.body);
  res.status(201).json("OK");
})));

module.exports = router;