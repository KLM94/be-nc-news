const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/controller");

//.route?

usersRouter.get("/:username", getUserByUsername);

module.exports = usersRouter;
