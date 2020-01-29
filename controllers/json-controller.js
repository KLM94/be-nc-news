const { selectJson } = require("../models/json-model");

exports.getJson = (req, res, next) => {
  selectJson(json)
    .then(function(json) {
      res.status(200).send(json);
    })
    .catch(next);
};
