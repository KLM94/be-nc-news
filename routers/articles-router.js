const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticleById,
  postCommentToArticle,
  getCommentByArticleId
} = require("../controllers/articles-controller");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentByArticleId)
  .post(postCommentToArticle);

module.exports = articlesRouter;
