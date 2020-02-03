const { selectEndpointsAsJson } = require("../models/json-model");

exports.getJson = (req, res, next) => {
  res.status(200).send(selectEndpointsAsJson());
};

// selectEndpointsAsJson()
//   .then(json => {
// res.status(200).send(selectEndpointsAsJson());
// })
// .catch(next);
