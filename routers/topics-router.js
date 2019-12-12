const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/controller");

//.route?
topicsRouter.get("/", getTopics);

module.exports = topicsRouter;
