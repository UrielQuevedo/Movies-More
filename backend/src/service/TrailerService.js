const PaginationService = require('../service/PaginationService');
const TrailerDaoFirebase = require('../persistence/TrailerDaoFirebase');

const getTrailer = (uid) => {
  TrailerDaoFirebase.getTrailer(uid);
}

const getTrailers = (genre, page, range) => {
  return PaginationService.getContents('trailers', genre, page, range);
}

module.exports = {
  getTrailer,
  getTrailers,
}