const {
  fetchTopics,
  fetchUsersByUsername,
  fetchArticleById,
  updateArticleById,
  addCommentToArticle
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
    .catch(next);
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(function(article) {
      res.status(200).send(article);
    })
    .catch(next);
};

const patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(function(article) {
      res.status(200).send(article);
    })
    .catch(next);
};

const postCommentToArticle = (req, res, next) => {
  console.log("IN THE CONTROLLER");
  const { article_id } = req.params;
  const { username, body } = req.body;
  addCommentToArticle(article_id, username, body)
    .then(function(comment) {
      res.status(201).send(comment);
    })
    .catch(next);
};

module.exports = {
  getTopics,
  getUserByUsername,
  getArticleById,
  patchArticleById,
  postCommentToArticle
};
