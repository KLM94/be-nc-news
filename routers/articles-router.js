const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentToArticle,
  getCommentByArticleId
} = require("../controllers/controller");

//.route?

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/article_id/comments", getCommentByArticleId);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.post("/:article_id/comments", postCommentToArticle);

module.exports = articlesRouter;
