const { updateCommentById } = require("../models/comments-model");

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(comment => {
      // console.log(comment);
      res.status(200).send(comment);
    })
    .catch(next);
};
