const connection = require("../db/connection");

exports.selectArticleById = article_id => {
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

exports.updateArticleById = (article_id, votes) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", votes)
    .returning("*")
    .then(article => {
      if (votes === undefined) {
        return Promise.reject({
          status: 400,
          msg: "Bad Request"
        });
      }
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

exports.selectCommentByArticleId = (sort_by, order_by, article_id) => {
  return connection("comments")
    .where("comments.article_id", "=", article_id)
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by || "created_at", order_by || "desc")
    .then(comments => {
      // console.log(comments);
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Id does not exist"
        });
      }
      return { comments: comments };
    });
};

exports.selectArticles = (sort_by, order_by, author, topic) => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order_by || "desc")
    .modify(query => {
      if (author) query.where("articles.author", "=", author);
      if (topic) query.where("articles.topic", "=", topic);
    })
    .then(article => {
      // if (order_by != "asc" || order_by != "desc") {
      //   return Promise.reject({
      //     status: 400,
      //     msg: "Bad request"
      //   });
      // }
      return { articles: article };
    });
};
