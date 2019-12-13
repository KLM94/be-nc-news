const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentToArticle
} = require("../controllers/controller");

//.route?

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.post("/:article_id/comments", postCommentToArticle);

module.exports = articlesRouter;
