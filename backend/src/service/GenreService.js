const GenreDaoFirebase = require('../persistence/GenreDaoFirebase');

const addGenres = (genres, content) => {
  GenreDaoFirebase.addGenres(genres, content);
}

const getGenres = (content) => {
  return GenreDaoFirebase.getGenres(content);
}

module.exports = {
  addGenres,
  getGenres,
}