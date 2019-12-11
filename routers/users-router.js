const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/controller");

//.route?

usersRouter.get("/:username", getUsersByUsername);

module.exports = usersRouter;
