const connection = require("../db/connection");

exports.updateCommentById = () => {
  return connection("comments").then(comments => {
    return { comment: comments };
  });
};

// exports.updateArticleById = (article_id, votes) => {
//   return connection("articles")
//     .where("article_id", "=", article_id)
//     .increment("votes", votes)
//     .returning("*")
//     .then(article => {
//       if (votes === undefined) {
//         return Promise.reject({
//           status: 400,
//           msg: "Bad Request"
//         });
//       }
//       return { article: article };
//     });
// };
