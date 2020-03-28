const { Router } = require('express');
const { executeFunction } = require('../connection');
const GenresService = require('../service/GenreService');
const router = Router();

/*
  Devuelvo los generos correspondiente con el nombre pasado por parametro
*/
router.get('/:content', (executeFunction([], (req, res) => {
  const { content } = req.params;
  GenresService.getGenres(content)
    .then((genres) => res.status(201).json(genres))
})));

module.exports = router;