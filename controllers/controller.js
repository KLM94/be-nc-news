const {
  fetchTopics,
  fetchUsersByUsername,
  fetchArticleById,
  updateArticleById,
  addCommentToArticle,
  fetchCommentByArticleId
} = require("../models/model");

const getTopics = (req, res, next) => {
  fetchTopics()
    .then(function(topics) {
      //console.log(topics);
      res.status(200).send(topics);
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUsersByUsername(username)
    .then(function(user) {
      //console.log(user);
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
      // console.log(article);
      res.status(200).send(article);
    })
    .catch(next);
};

const postCommentToArticle = (req, res, next) => {
  //console.log("IN THE CONTROLLER");
  const { article_id } = req.params;
  const { username, body } = req.body;
  addCommentToArticle(article_id, username, body)
    .then(function(comment) {
      //console.log(comment);
      res.status(201).send(comment);
    })
    .catch(next);
};

const getCommentByArticleId = (req, res, next) => {
  console.log("IN THE CONTROLLER");
  const { article_id } = req.params;
  fetchCommentByArticleId(article_id).then(comment => {
    console.log(comment);
  });
};

module.exports = {
  getTopics,
  getUserByUsername,
  getArticleById,
  patchArticleById,
  postCommentToArticle,
  getCommentByArticleId
};
