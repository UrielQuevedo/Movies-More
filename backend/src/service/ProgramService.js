const ProgramDaoFirebase = require('../persistence/ProgramDaoFirebase');
const PaginationService = require('../service/PaginationService');

const addProgram = (program) => {
  return ProgramDaoFirebase.addProgram(program);
}

const addSeason = (season, programUid) => {
  ProgramDaoFirebase.addSeason(season, programUid);
}

const addEpisode = (episode, programUid) => {
  ProgramDaoFirebase.addEpisode(episode, programUid);
}

const getProgram = (uid) => {
  return ProgramDaoFirebase.getProgram(uid);
}

const getSeason = (uid, season_number) => {
  return ProgramDaoFirebase.getSeason(uid, season_number);
}

const getEpisode = (uid, season_number, episode_number) => {
  return ProgramDaoFirebase.getEpisode(uid, season_number, episode_number);
}

const getPrograms = (genre, page, range) => {
  return PaginationService.getContents('programs', genre, page, range);
}

const getNewEpisodes = (page, range) => {
  const { lastItems, limit } = PaginationService.getValuesOfPagination(page, range);
  return ProgramDaoFirebase.getNewEpisodes(lastItems, limit);
}

module.exports = {
  addSeason,
  addProgram,
  getProgram,
  getSeason,
  getEpisode,
  getPrograms,
  addEpisode,
  getNewEpisodes,
}