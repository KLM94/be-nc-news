const {
  fetchTopics,
  fetchUsersByUsername,
  fetchArticleById,
  updateArticleById,
  addCommentToArticle,
  fetchCommentByArticleId,
  fetchArticles
} = require("../models/model");

// >>>>>>>> REFACTOR TO USE EXPORTS

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
      console.log(article);
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
    .then(comment => {
      //console.log(comment);
      res.status(201).send(comment);
    })
    .catch(next);
};

const getCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order_by } = req.query;
  fetchCommentByArticleId(sort_by, order_by, article_id)
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  fetchArticles()
    .then(articles => {
      //console.log(articles);
      res.status(200).send(articles);
    })
    .catch(next);
};

module.exports = {
  getTopics,
  getUserByUsername,
  getArticleById,
  patchArticleById,
  postCommentToArticle,
  getCommentByArticleId,
  getArticles
};
