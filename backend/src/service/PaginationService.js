const DEFAULT_NUMBER_OF_ITEMS = 20;
const ContentDaoFirebase = require('../persistence/ContentDaoFirebase');

const getValuesOfPagination = (page, range) => {
  let NUMBER_OF_ITEMS = DEFAULT_NUMBER_OF_ITEMS;
  if (range) {
    NUMBER_OF_ITEMS = range;
  }
  const lastItems = (page - 1) * NUMBER_OF_ITEMS;
  const limit = NUMBER_OF_ITEMS
  return { lastItems, limit };
}

const getContents = (content, genre, page, range) => {
  const { lastItems, limit} = getValuesOfPagination(page, range);
  if (genre === 'new') {
    return ContentDaoFirebase.getLastContents(content, lastItems, limit);
  }
  return ContentDaoFirebase.getContents(content, genre, lastItems, limit);
}

module.exports = {
  getContents,
  getValuesOfPagination,
}