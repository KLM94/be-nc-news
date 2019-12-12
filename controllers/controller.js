const {
  fetchTopics,
  fetchUsersByUsername,
  fetchArticleById
} = require("../models/model");

const getTopics = (req, res, next) => {
  fetchTopics()
    .then(function(topics) {
      res.status(200).send(topics);
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUsersByUsername(username)
    .then(function(user) {
      res.status(200).send(user);
    })
    .catch(function(err) {
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  console.log("Reached the controller");
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then(function(article) {
      res.status(200).send(article);
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    });
};

module.exports = { getTopics, getUserByUsername, getArticleById };
