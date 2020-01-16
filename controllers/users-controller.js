const { selectUsersByUsername } = require("../models/users-model");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsersByUsername(username)
    .then(function(user) {
      //console.log(user);
      res.status(200).send(user);
    })
    .catch(next);
};
