const connection = require("../db/connection");

exports.updateCommentById = (comment_id, inc_votes) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Id does not exist"
        });
      }
      return { comment: comment };
    });
};

exports.removeCommentById = commentId => {
  return connection("comments")
    .where("comment_id", "=", commentId)
    .del();
};
