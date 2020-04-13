const { Router } = require('express');
const { executeFunction } = require('../connection');
const router = Router();
const { checkIfAuthenticated } = require('../middleware/auth-middleware');

router.post('/', checkIfAuthenticated, (executeFunction(['task'], async (req, res) => {
  const { task } = req.body;

  console.log(task);

  res.status(201).json({ message: 'Ok' });
})))


module.exports = router;