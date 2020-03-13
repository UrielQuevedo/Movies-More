const { Router } = require('express');
const { executeFunction, db} = require('../connection');
const router = Router();

router.get('/', (executeFunction([], (req, res) => {
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