const connection = require("../connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then(allTopics => {
      return allTopics;
    });
};

exports.fetchUsersByUsername = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(users => {
      return users;
    });
};
