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
    const commentCopy = { ...comment };
    coppiedComments.push({
      body: commentCopy.body,
      article_id: articleRef[commentCopy.belongs_to],
      author: commentCopy.created_by,
      votes: commentCopy.votes,
      created_at: new Date(commentCopy.created_at)
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
