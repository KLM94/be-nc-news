process.env.NODE_ENV = "test";
const server = require("../server");
const request = require("supertest");
const { expect } = require("chai");
const connection = require("../connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/topics", () => {
    it("GET: 200, sends an array of topics", () => {
      return request(server)
        .get("/api/topics")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.topics[0]).to.have.keys(["slug", "description"]);
        });
    });
  });
  describe("/users/:username", () => {
    it("GET: 200 gives back correct information when username is passed", () => {
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
  describe.only("/articles/:article_id", () => {
    it("GET: 200 sends back article information", () => {
      return request(server)
        .get("/api/articles/1")
        .expect(200)
        .then(response => {
          // console.log(response.body);
          expect(response.body).to.be.an("object");
        });
    });
  });
});
