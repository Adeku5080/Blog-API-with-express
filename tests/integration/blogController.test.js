const request = require("supertest");
const app = require("../../app");
const sinon = require("sinon");

const BlogPost = require("../../src/models/blog");

let sandbox;

describe("Blog Controller", () => {
  beforeAll(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });


  describe("get posts", () => {
    it("should return all posts", async () => {
      const response = await request(app).get("/blogs");

      expect(response.status).toBe(200);
    });
  });

  describe("get a post",()=>{
    it("get a post details", async ()=>{
       const response = await request(app).get("/blogs/63684f599c52563a8f04b486")

       expect (response.status).toBe(200);
    })
  })

  // describe("createAPost", () => {
  //   it("should return an empty data if no posts are found", async () => {});

  //   it("should return an empty data if no published posts are found", async () => {});

  //   it("should return a 500 error if there is an exception", async () => {
  //     sandbox.stub(BlogPost, "find").rejects(new Error("fake error"));

  //     const response = await request(app).get("/blogs");

  //     expect(response.status).toBe(500);
  //   });

  
  // });
});
