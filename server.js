const express = require("express");
const apiRouter = require("./routers/api-router.js");
const server = express();

server.use(express.json());

server.use("/api", apiRouter);

server.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Invalid file path" });
});

server.use((err, req, res, next) => {
  if (err.status) res.status(404).send(err);
  // else if (err
  // res.status(500).send({ msg: "Internal Server Error" });
  console.log(err);
});

module.exports = server;
