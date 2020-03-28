const ProgramDaoFirebase = require('../persistence/ProgramDaoFirebase');
const PaginationService = require('../service/PaginationService');

const addProgram = (program) => {
  ProgramDaoFirebase.addProgram(program);
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

const getLatestEpisodes = (page, range) => {
  const { lastItems, limit } = PaginationService.getValuesOfPagination(page, range);
  return ProgramDaoFirebase.getLatestEpisodes(lastItems, limit);
}

module.exports = {
  addProgram,
  getProgram,
  getSeason,
  getEpisode,
  getPrograms,
  getLatestEpisodes,
}