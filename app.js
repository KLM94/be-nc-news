const express = require("express");
const apiRouter = require("./routers/api-router.js");
const app = express();
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors/index");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (err, req, res, next) => {
  res.status(404).send({ msg: "Internal server error" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
