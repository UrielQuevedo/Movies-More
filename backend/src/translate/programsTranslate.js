const translate = (leng, program) => {
  const translated_program = {
    title: program[`${leng}_title`],
    backdrop_url: program.backdrop_url,
    overview: program[`${leng}_overview`],
    poster_url: program[`${leng}_poster_url`],
    genres: program.genres,
    number_of_seasons: program.number_of_seasons,
    number_of_episodes: program.number_of_episodes,
    uid: program.uid,
  }
  return translated_program;
}

const translateAll = (leng, programs) => {
  return programs.map((program) => translate(leng, program));
}

module.exports = {
  translate,
  translateAll,
}