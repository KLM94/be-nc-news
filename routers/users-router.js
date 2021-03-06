const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users-controller");

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

module.exports = usersRouter;
