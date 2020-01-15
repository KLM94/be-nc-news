const express = require("express");
const apiRouter = require("./routers/api-router.js");
const server = express();
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors/index");

server.use(express.json());

server.use("/api", apiRouter);

server.all("/*", (err, req, res, next) => {
  //console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});

server.use(handleCustomErrors);
server.use(handlePsqlErrors);
server.use(handleServerErrors);

module.exports = server;
