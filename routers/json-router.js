const jsonRouter = require("express").Router();
const { getJson } = require("../controllers/json-controller");

jsonRouter
  .route("/")
  .get(getJson)
  .all((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

module.exports = jsonRouter;
