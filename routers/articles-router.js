const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticleById,
  postCommentToArticle,
  getCommentByArticleId
} = require("../controllers/controller");

//>>>>>>>>>>>>>>REFACTOR TO USE ROUTE

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getCommentByArticleId);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.post("/:article_id/comments", postCommentToArticle);

module.exports = articlesRouter;
