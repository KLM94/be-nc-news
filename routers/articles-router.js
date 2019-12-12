const articlesRouter = require("express").Router();
const { getArticleById } = require("../controllers/controller");

//.route?

articlesRouter.get("/:article_id", getArticleById);

module.exports = articlesRouter;
