const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticleById,
  postCommentToArticle,
  getCommentByArticleId
} = require("../controllers/articles-controller");

articlesRouter
  .route("/")
  .get(getArticles)
  .all((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentByArticleId)
  .post(postCommentToArticle)
  .all((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

module.exports = articlesRouter;
