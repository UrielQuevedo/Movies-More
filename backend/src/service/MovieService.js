const MovieDAOFirebase = require('../persistence/MovieDAOFirebase');
const PaginationService = require('../service/PaginationService');

const getMovies = (genre, page, range) => {
  return PaginationService.getContents('movies', genre, page, range);
}

const addMovie = (movie) => {
  MovieDAOFirebase.addMovie(movie);
}

const getMovie = (uid) => {
  return MovieDAOFirebase.getMovie(uid);
}

module.exports = {
  getMovies,
  getMovie,
  addMovie,
}