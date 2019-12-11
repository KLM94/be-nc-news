exports.formatDates = ([...articles]) => {
  articles.forEach(article => {
    article.created_at = new Date(article.created_at);
  });

  return articles;
};

exports.makeRefObj = list => {
  const referenceObj = {};

  list.forEach(article => {
    referenceObj[article.title] = article.article_id;
  });

  return referenceObj;
};

exports.formatComments = (comments, articleRef) => {
  let coppiedComments = [];
  comments.forEach(comment => {
    coppiedComments.push({
      body: comment.body,
      article_id: articleRef[comment.belongs_to],
      author: comment.created_by,
      votes: comment.votes,
      created_at: new Date(comment.created_at)
    });
  });
  return coppiedComments;
};

// let coppiedComments = [...comments];

// coppiedComments.forEach(comment => {
//   comment["author"] = comment["created_by"];
//   delete comment["created_by"];

//   comment["article_id"] = comment["belongs_to"];
//   delete comment["belongs_to"];

//   comment["article_id"] = articleRef[comment["article_id"]];

//   comment.created_at = new Date(comment.created_at);
// });

// return coppiedComments
// Not mutating the array but need to make sure it's not mutating the object
