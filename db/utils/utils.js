exports.formatDates = ([...articles]) => {
  articles.forEach(article => {
    article.created_at = new Date(article.created_at).toUTCString(); //.toString();
  });
  // const date = list[0].created_at;
  // const newDate = new Date(date).toString();
  //console.log(articles);
  return articles;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
