const { Router } = require('express');
const { executeFunction } = require('../connection');
const MovieService = require('../service/MovieService');
const router = Router();
const rp = require('request-promise');
const GenreService = require('../service/GenreService');
const { translate, translateAll } = require('../translate/moviesTranslate');

// // Devuelve una pelicula con todos los detalles
// router.get('/:id', (executeFunction(['lenguage'], (req, res) => {
//   console.log("ENTRO1");
//   const movie = MovieService.getMovie(req.params.id);
//   // traducir la movie y retornarla
//   res.status(201).json(movie);
// })))

// Devuelve una paginacion de peliculas
router.get('/genre/:genre', (executeFunction(['page','lenguage'], (req, res) => {
  const { genre } = req.params;
  const { page, range } = req.query;
  MovieService.getMovies(genre, parseInt(page), parseInt(range))
    .then((movies) => res.status(201).json(movies))
})))

// Devuelve los comentarios de una pelicula
router.get('/:id/comments', (executeFunction([], (req, res) => {

})))

router.get('/movie/traer', (executeFunction([],(_, res) => {
  let ids = [];
  let genres = new Set();
  for (let i = 1; i < 9; i++) {
    rp(`https://api.themoviedb.org/3/movie/popular?api_key=79a3f2fba1eb064439c6aecab8c7d7b2&language=en-US&page=${i}`)
    .then((response) => {
      const result = JSON.parse(response);
      result.results.forEach(element => {
        ids.push(element.id)
      });
      if(i === 8) {
        ids.forEach(id => {
          rp(`https://api.themoviedb.org/3/movie/${id}?api_key=79a3f2fba1eb064439c6aecab8c7d7b2&language=es`)
          .then((data) => {
            const _data = JSON.parse(data);
            const _backdrop = `https://image.tmdb.org/t/p/original${_data.backdrop_path}`;
            const poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${_data.poster_path}`; 
            var newMovie = {
              upload_date: new Date(),
              backdrop_url: _backdrop,
              es_title: _data.title,
              es_overview: _data.overview,
              runtime: _data.runtime,
              es_poster_url: poster,
            }
            rp(`https://api.themoviedb.org/3/movie/${id}?api_key=79a3f2fba1eb064439c6aecab8c7d7b2&language=en`)
            .then((en) => {
              const _en = JSON.parse(en)
              const poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${_en.poster_path}`; 
              newMovie.en_overview = _en.overview;
              newMovie.en_title = _en.title,
              newMovie.en_poster_url = poster,
              newMovie.genres = _en.genres.map((e) => e.name.toLowerCase());
              newMovie.genres.forEach(e => genres.add(e));
              rp(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=79a3f2fba1eb064439c6aecab8c7d7b2`)
              .then((credits) => {
                const _credist = JSON.parse(credits);
                const director = _credist.crew.find((e) => e.job === "Director");

                if (director) {
                  newMovie.director = director.name;
                } else {
                  newMovie.director = "?";
                }
                MovieService.addMovie(newMovie);
                const ls = Array.from(genres);
                GenreService.addGenres(ls, 'movies');
              })
              .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error))
        })
      }
    })
    .catch((error) => console.log("ERROR"));     
  }
  res.status(201).json("OK");
})));

module.exports = router;