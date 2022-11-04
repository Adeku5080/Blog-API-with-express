const request = require("supertest");
const app = require("../../app");
const sinon = require("sinon");

const BlogPost = require("../../models/blogModel");

let sandbox;

describe("Blog Controller", () => {
  beforeAll(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("createAPost", () => {
    it("should return an empty data if no posts are found", async () => {});

    it("should return an empty data if no published posts are found", async () => {});

    it("should return a 500 error if there is an exception", async () => {
      sandbox.stub(BlogPost, "find").rejects(new Error("fake error"));

      const response = await request(app).get("/blogposts");

      expect(response.status).toBe(500);
    });

    it("should do something", async () => {
      const response = await request(app).get("/blogposts");

      expect(response.status).toBe(200);
    });
  });
});
