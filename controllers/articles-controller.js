const {
  selectArticleById,
  updateArticleById,
  addCommentToArticle,
  selectCommentByArticleId,
  selectArticles
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(function(article) {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { votes } = req.body;

  updateArticleById(article_id, votes)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.postCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  addCommentToArticle(article_id, username, body)
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.getCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order_by } = req.query;
  selectCommentByArticleId(sort_by, order_by, article_id)
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order_by, author, topic } = req.query;
  selectArticles(sort_by, order_by, author, topic)
    .then(articles => {
      res.status(200).send(articles);
    })
    .catch(next);
};
