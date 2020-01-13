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
  //console.log(err);
  const psqlCodes = ["22P02"]; //ref object

  if (psqlCodes[0] === "22P02") {
    res.status(400).send({ msg: "Invalid ID" });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = server;
