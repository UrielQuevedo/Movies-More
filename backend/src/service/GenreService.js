const GenreDaoFirebase = require('../persistence/GenreDaoFirebase');

const addGenres = (genres) => {
  GenreDaoFirebase.addGenres(genres);
}

module.exports = {
  addGenres,
}