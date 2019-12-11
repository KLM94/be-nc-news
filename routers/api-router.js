const apiRouter = require("express").Router();
const topicsRouter = require("./topic-router");
const usersRouter = require("./users-router");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;