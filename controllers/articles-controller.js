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
  const { inc_votes } = req.body;

  updateArticleById(article_id, inc_votes)
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
  const { sort_by, order } = req.query;
  selectCommentByArticleId(sort_by, order, article_id)
    .then(comments => {
      // console.log(comments);
      res.status(200).send(comments);
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  selectArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send(articles);
    })
    .catch(next);
};
