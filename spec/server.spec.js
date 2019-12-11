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
    it("GET:400 responds with an error message when no information is found", () => {
      return request(server)
        .get("/topics")
        .expect(404) // <<<<<< Look for a better error message and handle it.
        .then(response => {
          expect(response.body.msg).to.equal("Bad request");
        });
    });
  });
  describe("/users/butter_bridge", () => {
    it("GET: 200 gives back correct information when username is passed", () => {
      return request(server)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.users).to.eql([
            {
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
            }
          ]);
          expect(response.body.users[0]).to.have.keys([
            "username",
            "name",
            "avatar_url"
          ]);
        });
    });
  });
});
