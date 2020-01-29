const { selectTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then(function(topics) {
      res.status(200).send(topics);
    })
    .catch(next);
};
