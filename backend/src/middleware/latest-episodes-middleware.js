const { translateAll } = require('../translate/episodesTranslate');
const ProgramService = require('../service/ProgramService');

const checkGenre = async (req, res, next) => {
  const { genre } = req.params;
  const { page, range, language } = req.query;
  if (genre === 'latest_episodes') {
    const latest_episodes = await ProgramService.getLatestEpisodes(parseInt(page), parseInt(range));
    const latest_episodes_filtered = latest_episodes.filter(e => e != null);
    res.status(201).json(translateAll(language, latest_episodes_filtered));
  } else {
    next();
  }
};

module.exports = {
  checkGenre
};