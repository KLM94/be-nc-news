const { fetchTopics, fetchUsersByUsername } = require("../models/model");

const getTopics = (req, res, next) => {
  fetchTopics()
    .then(function(topics) {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUsersByUsername(username)
    .then(function(users) {
      res.status(200).send({ users });
    })
    .catch(next);
};

module.exports = { getTopics, getUsersByUsername };
