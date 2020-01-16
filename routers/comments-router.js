const commentsRouter = require("express").Router();
const { patchCommentById } = require("../controllers/comments-controller");

commentsRouter.route("/:comment_id").patch(patchCommentById);

module.exports = commentsRouter;
