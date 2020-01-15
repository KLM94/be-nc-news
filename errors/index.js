const handleCustomErrors = (err, req, res, next) => {
  //console.log(err);

  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handlePsqlErrors = (err, req, res, next) => {
  //console.log(err);
  if (err.code) {
    const errorCodes = {
      "22P02": [400, "Incorrect Data-type"],
      "23502": [400, "Missing required field"]
    };
    res.status(errorCodes[err.code][0]).send({ msg: errorCodes[err.code][1] });
  }
  next(err);
};

const handleServerErrors = (err, req, res, next) => {
  //console.log(err);
  if (err.status) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
};
