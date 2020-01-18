const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

module.exports = commentsRouter;
