exports.formatDates = ([...articles]) => {
  articles.forEach(article => {
    article.created_at = new Date(article.created_at);
  });

  return articles;
};

// exports.formatDates = ([...articles]) => {
//   articles.forEach(article => {
//     const articleCopy = { ...article };
//     articleCopy.created_at = new Date(articleCopy.created_at);
//   });

//   return articles;
// };

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
