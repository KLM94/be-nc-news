const connection = require("../connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then(allTopics => {
      return { topics: allTopics };
    });
};

exports.fetchUsersByUsername = username => {
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
      return { user: user };
    });
};

exports.fetchArticleById = article_id => {
  console.log(article_id);
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .then(articles => {
      console.log(articles);
    });
};
