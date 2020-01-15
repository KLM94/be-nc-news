process.env.NODE_ENV = "test";
const server = require("../server");
const request = require("supertest");
const { expect } = require("chai");
const connection = require("../db/connection");

describe("/api", () => {
  //200
  beforeEach(() => connection.seed.run()); //return
  after(() => connection.destroy());
  describe("GET /topics", () => {
    it("responds with status 200 and sends all topics", () => {
      return request(server)
        .get("/api/topics") //How to error handle in spec as all other errors are dealt with in the path.
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
    // it("GET:400 responds with 'Missing required fields' when there is no data", () => {
    //   return request(server)
    //     .get("/api/topics")
    //     .expect(400)
    //     .then(response => {
    //       expect(response.body.msg).to.equal("Missing required fields");
    //     });
    // });
  });
  describe("GET /users/:username", () => {
    it("responds with status 200 and gives back the correct information when a username is passed", () => {
      return request(server)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.user[0]).to.have.keys([
            "username",
            "name",
            "avatar_url"
          ]);
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
    it("GET:404 responds with 'Username does not exist' when given an id that does not exist", () => {
      return request(server)
        .get("/api/users/bbutters")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Username does not exist");
        });
    });
  });
  describe("GET /articles/:article_id", () => {
    it("responds with status 200 and sends back article information with a total count of comments", () => {
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
        });
    });
    it("GET:404 responds with 'Article does not exist' when given an id that doesn't exist", () => {
      return request(server)
        .get("/api/articles/9999")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Article does not exist");
        });
    });
    it("GET:400 responds with 'Incorrect Data-type' when given an invalid id ", () => {
      return request(server)
        .get("/api/articles/Not_an_Id")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Incorrect Data-type");
        });
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
          expect(response.body.article).to.eql([
            {
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 104,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z"
            }
          ]);
          //test to check it increments
          //test to check it decrements
        });
      //add has own property for counts
    });
    it("PATCH:400 responds with 'Incorrect Data-type' when updating votes that isn't an integer", () => {
      return request(server)
        .patch("/api/articles/1")
        .send({ inc_votes: "Northcoders" })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Incorrect Data-type");
        });
    });
    xit("PATCH:405 responds with 'Method Not Allowed' when trying to add an extra property", () => {
      // Not 405
      //Bad Request if key is wrong
      return request(server)
        .patch("/api/articles/1")
        .send({ banana: 1 })
        .expect(405)
        .then(response => {
          expect(response.body.msg).to.equal("Method Not Allowed");
        });
    });
  });

  //to.contain.keys
  //houses.every egkdnlf === true

  describe("POST /articles/:article_id/comments", () => {
    it("responds with status 201 and posts a comment", () => {
      return request(server)
        .post("/api/articles/4/comments")
        .send({ username: "rogersop", body: "Look at my new comment!" })
        .expect(201)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comments[0]).to.have.keys([
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
        });
    });
    it("POST:400 responds with 'Missing required field' when there is no information entered", () => {
      return request(server)
        .post("/api/articles/5/comments")
        .send({ username: null, body: null })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Missing required field");
        });
    });
  });
  describe.only("GET: /articles/:article_id/comments", () => {
    it("responds with status 200 and sends back comment for a given article ID", () => {
      return request(server)
        .get("/api/articles/4/comments")
        .expect(200)
        .then(response => {
          expect(response.body.comments[0]).to.be.an("array");
        });
    });
  });
});
