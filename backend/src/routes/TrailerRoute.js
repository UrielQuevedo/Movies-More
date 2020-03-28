const { Router } = require('express');
const { executeFunction } = require('../connection');
const router = Router();
const TrailerService = require('../service/TrailerService');

/*
  Devuelvo los generos correspondiente con el nombre pasado por parametro
*/
router.get('/:uid', (executeFunction(['language'], (req, res) => {
  const { uid } = req.params;
  TrailerService.getTrailer(uid)
    .then((trailer) => res.status(201).json(trailer))
})));

/*
  Devuelvo los generos correspondiente con el nombre pasado por parametro
*/
router.get('/genre/:genre', (executeFunction(['page', 'language'], (req, res) => {
  const { genre } = req.params;
  const { page, range } = req.query;
  TrailerService.getTrailers(genre, parseInt(page), parseInt(range))
    .then((trailers) => res.status(201).json(trailers))
})));

module.exports = router;