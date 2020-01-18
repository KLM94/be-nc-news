const connection = require("../db/connection");

exports.selectUsersByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Username does not exist"
        });
      }
      return { user: user[0] };
    });
};
