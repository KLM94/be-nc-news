process.env.NODE_ENV = "test";
const server = require("../server");
const request = require("supertest");
const { expect } = require("chai");
const connection = require("../connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("GET /topics", () => {
    it.only("responds with status 200 and sends all topics", () => {
      return request(server)
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
    it("responds with status 200 and gives back correct information when username is passed", () => {
      return request(server)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.user).to.eql([
            {
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
            }
          ]);
          expect(response.body.user[0]).to.have.keys([
            "username",
            "name",
            "avatar_url"
          ]);
        });
    });
  });
  it("GET:404 responds with an error message when given an invalid username", () => {
    return request(server)
      .get("/api/users/not-an-id")
      .expect(404)
      .then(response => {
        expect(response.body.msg).to.equal("Username does not exist");
      });
  });
  describe("GET /articles/:article_id", () => {
    it("responds with status 200 and sends back article information with a comment count", () => {
      return request(server)
        .get("/api/articles/1")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.articles[0]).to.have.keys([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          ]);
          expect(response.body.articles).to.eql([
            {
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
              comment_count: "13"
            }
          ]);
          // test to prove the comment count
        });
    });
  });
  it("GET:404 responds with an error message when given an article_id that doesn't exist", () => {
    return request(server)
      .get("/api/articles/9999")
      .expect(404)
      .then(response => {
        expect(response.body.msg).to.equal("Article does not exist");
      });
  });
  describe("PATCH /articles/:article_id", () => {
    it("responds with status 200 and updates the votes", () => {
      return request(server)
        .patch("/api/articles/1")
        .send({ inc_votes: 4 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          //error handling
          //test to check it increments
          //test to check it decrements
        });
    });
  });
  describe("POST /articles/:article_id/comments", () => {
    it("responds with status 201 and posts a comment", () => {
      return request(server)
        .post("/api/articles/4/comments")
        .send({ username: "rogersop", body: "Look at my new comment!" })
        .expect(201)
        .then(response => {
          expect(response.body).to.be.an("object");
          // expect(response.body.comments).to.eql([
          //   {

          //   }
          // ])
        });
    });
  });
});
