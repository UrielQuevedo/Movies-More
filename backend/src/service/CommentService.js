const CommentDaoFirebase = require('../persistence/CommentDaoFirebase.js');

const addComment =  ( content_collection, uidContent, comment ) => {
  return CommentDaoFirebase.addComment(content_collection, uidContent, comment);
}

const removeComment = ( content_collection, uidContent, uidComment ) => {
  return CommentDaoFirebase.removeComment(content_collection, uidContent, uidComment);
}

const getComments = ( content_collection, uidContent ) => {
  return CommentDaoFirebase.getComments(content_collection, uidContent);
}

module.exports = {
  addComment,
  removeComment,
  getComments,
}