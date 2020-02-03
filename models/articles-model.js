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
      return { article: articles[0] };
    });
};

exports.updateArticleById = (article_id, inc_votes) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", inc_votes || 0)
    .returning("*")
    .then(article => {
      return { article: article[0] };
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
      return { comment: comment[0] };
    });
};

exports.selectCommentByArticleId = (sort_by, order, article_id, limit) => {
  return connection("comments")
    .limit(limit || 10)
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .then(comments => {
      // console.log(comments);
      if (comments.length === 0) {
        return checkIfArticleExists(article_id);
      }
      return { comments: comments };
    });
};

// const articleDoesntExist = article_id => {
//   return connection("articles.*")
//     .from("articles")
//     .where("article_id", "=", article_id)
//     .then(article => {
//       if (article.length === 0) {
//         return true;
//       }
//       return false;
//     });
// };

const checkIfArticleExists = article_id => {
  return connection("articles.*")
    .from("articles")
    .where("article_id", "=", article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article does not exist"
        });
      }
    });
};

exports.selectArticles = (sort_by, order, author, topic, limit) => {
  return connection
    .select("articles.*")
    .from("articles")
    .limit(limit || 10)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where("articles.author", "=", author);
      if (topic) query.where("articles.topic", "=", topic);
    })
    .then(articles => {
      if (order != "asc" && order != "desc" && order != undefined) {
        return Promise.reject({
          status: 400,
          msg: "Bad request"
        });
      }
      if (articles.length === 0 && author != undefined) {
        return selectAuthor(author);
      }
      if (articles.length === 0 && topic != undefined) {
        return selectTopic(topic);
      }

      return { articles };
    });
};

//const promiseAll = Promise.all([selectAuthor, selectTopic]);
//REFACTOR AND MAKE USE OF PROMISE ALL

const selectAuthor = author => {
  return connection("users.*")
    .from("users")
    .where("users.username", "=", author)
    .then(author => {
      if (author.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Author does not exist"
        });
      }
      return { articles: [] };
    });
};

const selectTopic = topic => {
  return connection("topics.*")
    .from("topics")
    .where("topics.slug", "=", topic)

    .then(topic => {
      if (topic.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Topic does not exist"
        });
      }
      return { articles: [] };
    });
};
