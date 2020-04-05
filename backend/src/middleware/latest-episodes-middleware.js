const { translateAll } = require('../translate/episodesTranslate');
const ProgramService = require('../service/ProgramService');

const checkGenre = async (req, res, next) => {
  const { genre } = req.params;
  const { page, range, language } = req.query;
  if (genre === 'new episodes') {
    const new_episodes = await ProgramService.getNewEpisodes(parseInt(page), parseInt(range));
    const new_episodes_filtered = new_episodes.filter(e => e != null);
    res.status(201).json(translateAll(language, new_episodes_filtered));
  } else {
    next();
  }
};

module.exports = {
  checkGenre
};