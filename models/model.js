const connection = require("../connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then(allTopics => {
      //console.log(allTopics);
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
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article does not exist"
        });
      }
      return { articles: articles };
    });
};

exports.updateArticleById = (article_id, inc_votes) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(article => {
      // console.log(article);
      return { article: article };
    });
};

exports.addCommentToArticle = (article_id, username, body) => {
  return connection("comments")
    .insert({
      body: body,
      author: username,
      article_id: article_id
    })
    .returning("*")
    .then(comment => {
      return { comments: comment };
    });
};
