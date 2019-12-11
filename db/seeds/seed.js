const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  console.log("seeeding...");
  // const topicsInsertions = knex("topics").insert(topicData);
  // const usersInsertions = knex("users").insert(userData);
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicPromise = knex("topics")
        .insert(topicData)
        .returning("*");
      const userPromise = knex("users")
        .insert(userData)
        .returning("*");
      return Promise.all([topicPromise, userPromise]);
    })
    .then(() => {
      return knex("articles")
        .insert(formatDates(articleData))
        .returning("*");
    })
    .then(articlesInfo => {
      return formatDates(articlesInfo);
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
