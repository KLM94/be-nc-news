const express = require("express");
const apiRouter = require("./routers/api-router.js");
const server = express();

server.use(express.json());

server.use("/api", apiRouter);

// server.all("/*", (req, res, next) => {
//   res.status(500).send({ msg: "Internal server error" });
// });

server.use((err, req, res, next) => {
  //no err.code
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

server.use((err, req, res, next) => {
  console.log("IN THE SERVER");
  console.log(err);

  //if (err.status === 404) res.status(404).send({ msg: "Resource not found." });
  if (err) res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = server;
