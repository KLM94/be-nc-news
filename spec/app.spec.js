process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const app = require("../app");
const request = require("supertest");
chai.use(require("sams-chai-sorted"));

const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it.only("responds with JSON, describing all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an("object");
      });
  });
  describe("GET /topics", () => {
    it("responds with status 200 and sends all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.topics[0]).to.have.keys(["slug", "description"]);
          expect(response.body.topics).to.eql([
            {
              description: "The man, the Mitch, the legend",
              slug: "mitch"
            },
            {
              description: "Not dogs",
              slug: "cats"
            },
            {
              description: "what books are made of",
              slug: "paper"
            }
          ]);
        });
    });
  });
  describe("GET /users/:username", () => {
    it("responds with status 200 and gives back the correct information when a username is passed", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.user).to.have.keys([
            "username",
            "name",
            "avatar_url"
          ]);
          expect(response.body.user).to.eql({
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          });
          expect(response.body.user).to.have.keys([
            "username",
            "name",
            "avatar_url"
          ]);
        });
    });
    it("GET:404 responds with 'Username does not exist' when given an id that does not exist", () => {
      return request(app)
        .get("/api/users/bbutters")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Username does not exist");
        });
    });
  });
  describe("GET /articles/:article_id", () => {
    it("responds with status 200 and sends back article information with a total count of comments", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "13"
          });
        });
    });
    it("GET:404 responds with 'Article does not exist' when given an id that doesn't exist", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Article does not exist");
        });
    });
    it("GET:400 responds with 'Incorrect Data-type' when given an invalid id ", () => {
      return request(app)
        .get("/api/articles/Not_an_Id")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Incorrect Data-type");
        });
    });
  });
  describe("PATCH /articles/:article_id", () => {
    it("responds with status 200 and updates and increments the votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 4 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article.votes).to.equal(104);
        });
    });
    it("responds with status 200 and updates and decrements the votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -4 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article.votes).to.equal(96);
        });
    });
  });

  describe("POST /articles/:article_id/comments", () => {
    it("responds with status 201 and posts a comment", () => {
      return request(app)
        .post("/api/articles/4/comments")
        .send({ username: "rogersop", body: "Look at my new comment!" })
        .expect(201)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comment).to.have.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
    it("POST:400 responds with 'Missing required field' when there is no information entered", () => {
      return request(app)
        .post("/api/articles/5/comments")
        .send({ username: null, body: null })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Missing required field");
        });
    });
  });
  describe("GET: /articles/:article_id/comments", () => {
    it("responds with status 200 and sends back an array of comments for a given article ID", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(response => {
          expect(response.body.comments).to.be.an("array");
          response.body.comments.forEach(comment => {
            expect(comment.article_id).to.equal(5);
          });
        });
    });
    xit("responds with status 200 and sends back an empty array when the article exists but has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(response => {
          expect(response.body.comments).to.be.an("array");
          expect(response.body.comments).to.have.length(0);
        });
    });
    it("GET:404 responds with 'Id does not exist' when an article Id does not exist", () => {
      return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Id does not exist");
        });
    });
    it("GET:400 responds with 'Incorrect Data-type' when given an invalid id'", () => {
      return request(app)
        .get("/api/articles/dog/comments")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Incorrect Data-type");
        });
    });
    it("responds with status 200 and sorts limits the number of responses (defaults to 10)", () => {
      return request(app)
        .get("/api/articles/5/comments?limit=4")
        .expect(200)
        .then(response => {
          expect(response.body.comments.length).to.be.below(5);
        });
    });
    it("responds with status 200 if limit isn't specified, it defaults to 10", () => {
      return request(app)
        .get("/api/articles/5/comments?limit=10")
        .expect(200)
        .then(response => {
          expect(response.body.comments.length).to.be.below(11);
        });
    });

    it("responds with status 200 and sorts comments by created_at", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(response => {
          expect(response.body.comments).to.be.an("array");
          expect(response.body.comments).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    // it("GET:404 responds with status 200 and sorts comments by created_at", () => {
    //   return request(app)
    //     .get("/api/articles/2/comments")
    //     .expect(200)
    //     .then(response => {
    //       expect(response.body.comments).to.be.an("array");
    //       expect(response.body.comments).to.be.sortedBy("created_at", {
    //         descending: true
    //       });
    //     });
    // });
    it("responds with status 200 and sorts comments by the specified query", () => {
      return request(app)
        .get("/api/articles/5/comments?sort_by=votes&order=asc")
        .expect(200)
        .then(response => {
          expect(response.body.comments).to.be.sortedBy("votes", {
            ascending: true
          });
        });
    });
    it("responds with status 200 and order comments by asc or desc", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .then(response => {
          expect(response.body.comments).to.be.sortedBy("created_at", {
            ascending: true
          });
        });
    });
  });

  it("GET:400 responds with 'Column does not exist' when trying to sort and/or order columns that does not exist", () => {
    return request(app)
      .get("/api/articles/5/comments?sort_by=dog")
      .expect(400)
      .then(response => {
        expect(response.body.msg).to.equal("Column does not exist");
      });
  });
  describe("GET: /articles", () => {
    it("responds with status 200 and sends all articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(response => {
          expect(response.body.articles.length).to.equal(10);
          expect(response.body.articles[0]).to.be.an("object");
          expect(response.body.articles[0]).to.have.keys(
            "author",
            "body",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("responds with status 200 and limits the number of responses (defaults to 10)", () => {
      return request(app)
        .get("/api/articles?limit=6")
        .expect(200)
        .then(response => {
          expect(response.body.articles.length).to.be.below(7);
        });
    });
    it("responds with status 200 if limit isn't specified, it defaults to 10", () => {
      return request(app)
        .get("/api/articles?limit=10")
        .expect(200)
        .then(response => {
          expect(response.body.articles.length).to.be.below(11);
        });
    });
    it("responds with status 200 and sorts articles by date and orders by descending by default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.be.an("array");
          expect(response.body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("responds with status 200 and sorts articles by the specified query and order", () => {
      return request(app)
        .get("/api/articles?sort_by=topic&order=asc")
        .expect(200)
        .then(response => {
          expect(response.body.articles).to.be.an("array");
          expect(response.body.articles).to.be.sortedBy("topic", {
            ascending: true
          });
        });
    });
    it("responds with status 200 and filters articles by the specified author ", () => {
      return request(app)
        .get("/api/articles/?author=butter_bridge")
        .expect(200)
        .then(response => {
          expect(
            response.body.articles.every(
              article => article.author === "butter_bridge"
            )
          ).to.be.true;
        });
    });
    it("responds with status 200 and filters articles by the specified topic", () => {
      return request(app)
        .get("/api/articles/?topic=mitch")
        .expect(200)
        .then(response => {
          expect(response.body.articles[0].topic).to.equal("mitch");
        });
    });
    it('GET:400 responds with "Column does not exist" when trying to sort a column that does not exist', () => {
      return request(app)
        .get("/api/articles?sort_by=northcoders")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Column does not exist");
        });
    });
    it('GET:400 responds with "Bad request" when trying to order by anything other than asc or desc', () => {
      return request(app)
        .get("/api/articles?sort_by=topic&order=abc")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Bad request");
        });
    });
    it('GET:404 responds with "Author does not exist" if there are no authors', () => {
      return request(app)
        .get("/api/articles?author=dog")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Author does not exist");
        });
    });
    it("responds with status 200 and an empty array if an author exists but does not have any articles", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.articles).to.have.length(0);
        });
    });
  });
  it('GET:404 responds with "Topic does not exist" if there are no topics', () => {
    return request(app)
      .get("/api/articles?topic=dog")
      .expect(404)
      .then(response => {
        expect(response.body.msg).to.equal("Topic does not exist");
      });
  });
  it("responds with status 200 and sends back an empty array if a topic exists but does not have any articles", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an("object");
        expect(response.body.articles).to.have.length(0);
      });
  });

  describe("PATCH /comments/:comment_id", () => {
    it("responds with status 200 and updates and increments the votes", () => {
      return request(app)
        .patch("/api/comments/5")
        .send({ inc_votes: 2 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comment.votes).to.equal(2);
        });
    });
    it("responds with status 200 and updates and decrements the votes", () => {
      return request(app)
        .patch("/api/comments/5")
        .send({ inc_votes: -2 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comment.votes).to.equal(-2);
        });
    });
    it("PATCH:404 responds with 'Id does not exist' when it contains a valid comment_id that does not exist", () => {
      return request(app)
        .patch("/api/comments/99999")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Id does not exist");
        });
    });
  });
  describe("DELETE /comments/:comment_id", () => {
    it("DELETE:204 deletes the given comment by comment_id", () => {
      return request(app)
        .delete("/api/comments/5")
        .expect(204);
    });
    it("DELETE:400 responds with 'Incorrect Data-type' when it contains an invalid id ", () => {
      return request(app)
        .delete("/api/comments/not-an-id")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Incorrect Data-type");
        });
    });
    it("DELETE:404 responds with 'Not found' when it contains a valid comment_id that does not exist ", () => {
      return request(app)
        .delete("/api/comments/1000")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Not found");
        });
    });
  });
});
