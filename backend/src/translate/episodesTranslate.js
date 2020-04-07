const translate = (leng, episode) => {
  const translated_episode = {
    episode_number: episode.episode_number,
    program_uid: episode.program_uid,
    season_number: episode.season_number,
    title: episode[`${leng}_title`],
    poster_url: episode[`${leng}_poster_url`],
    episode_title: episode[`${leng}_episode_title`],
    overview: episode[`${leng}_overview`],
    profile_path: episode.profile_path,
  }
  return translated_episode;
}

const translateAll = (leng, episodes) => {
  return episodes.map((episode) => translate(leng, episode));
}

module.exports = {
  translate,
  translateAll,
}