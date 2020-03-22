const MovieDAOFirebase = require('../persistence/MovieDAOFirebase');
const ITEMS = 20;

const getMovies = (genre, page) => {
  const lastItems = (page - 1) * ITEMS;
  const limit = (page * ITEMS);

  return MovieDAOFirebase.getMovies(genre, lastItems, limit);
}

const getLimitMovies = (genre, limit) => {
  return MovieDAOFirebase.getMovies(genre, 0, limit);
}

const addMovie = (movie) => {
  MovieDAOFirebase.addMovie(movie);
}

const getMovie = (id) => {

}

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  getLimitMovies,
}