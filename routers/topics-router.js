const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-controller");

topicsRouter
  .route("/")
  .get(getTopics)
  .all((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

module.exports = topicsRouter;
