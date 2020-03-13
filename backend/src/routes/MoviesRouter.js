const { Router } = require('express');
const { executeFunction } = require('../connection');
const MovieService = require('../service/MovieService');
const router = Router();

router.get('/', (executeFunction([], (_, res) => {
  MovieService.getMovies()
    .then(response => res.status(200).json(response))
    .catch(e => res.status(401).json(e))
})));

module.exports = router;