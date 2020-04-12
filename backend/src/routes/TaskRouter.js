const { Router } = require('express');
const { executeFunction } = require('../connection');
const router = Router();

router.post('/', (executeFunction(['task'], async (req, res) => {
  const { task } = req.body;

  console.log(task);

  res.status(201).json({ message: 'Ok' });
})))


module.exports = router;