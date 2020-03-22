const translate = (leng, movie) => {
  const translated_movie = {
    title: movie[`${leng}_title`],
    backdrop_url: movie.backdrop_url,
    director: movie.director,
    overview: movie[`${leng}_overview`],
    poster_url: movie[`${leng}_poster_url`],
    genres: movie.genres,
    runtime: movie.runtime
  }
  return translated_movie;
}

const translateAll = (leng, movies) => {
  return movies.map(movie => translate(leng, movie));
}

module.exports = {
  translate,
  translateAll,
}