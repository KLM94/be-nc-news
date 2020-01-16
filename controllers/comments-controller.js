const updateCommentById = require("../models/comments-model");

exports.patchCommentById = (req, res, next) => {
  // const { article_id } = req.params;
  // const { votes } = req.body;

  updateCommentById()
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(next);
};
