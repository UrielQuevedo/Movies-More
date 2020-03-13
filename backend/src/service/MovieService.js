const MovieDAOFirebase = require('../persistence/MovieDAOFirebase')

const getMovies = () => {
 return MovieDAOFirebase.getMovies();
}

module.exports = {
  getMovies,
}