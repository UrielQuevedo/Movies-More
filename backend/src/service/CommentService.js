const CommentDaoFirebase = require('../persistence/CommentDaoFirebase.js');

const addComment =  ({ content_collection, uidContent, comment }) => {
  CommentDaoFirebase.addComment(content_collection, uidContent, comment);
}

const removeComment = ({ content_collection, uidContent, uidComment }) => {
  CommentDaoFirebase.removeComment(content_collection, uidContent, uidComment);
}

const getComments = ({ content_collection, uidContent }) => {
  return CommentDaoFirebase.getComments(content_collection, uidContent);
}

const getComment = ({ content_collection, uidContent, uidComment }) => {
  return CommentDaoFirebase.getComment(content_collection, uidContent, uidComment);
}

module.exports = {
  addComment,
  removeComment,
  getComments,
  getComment,
}