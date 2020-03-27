const GenreDaoFirebase = require('../persistence/GenreDaoFirebase');

const addGenres = (genres) => {
  GenreDaoFirebase.addGenres(genres);
}

const getGenres = (content) => {
  return GenreDaoFirebase.getGenres(content);
}

module.exports = {
  addGenres,
  getGenres,
}