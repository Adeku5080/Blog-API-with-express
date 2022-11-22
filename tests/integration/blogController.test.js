const request = require("supertest");
const app = require("../../app");
const UserModel = require("../../src/models/user");

const BlogPost = require("../../src/models/blog");

let token;
describe("Blog Controller", () => {
  beforeEach(async () => {
    await UserModel.create({
      email: "aliadeku.aam@gmail.com",
      password: "Adeku123",
      last_name: "Adeku",
      first_name: "Ali",
    });

    const loginResponse = await request(app)
      .post("/login")
      .set("content-type", "application/json")
      .send({
        email: "aliadeku.aam@gmail.com",
        password: "Adeku123",
      });

    token = loginResponse.body.token;
  });

  afterEach(() => {});

  //get all posts
  describe("get posts", () => {
    it("should return all posts", async () => {
      const response = await request(app).get("/blogs");

      expect(response.status).toBe(200);
    });
  });

  //create a post
  describe("create post", () => {
    it("should create a post", async () => {
      const response = await request(app)
        .post("/user/blogs")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "A new dawn",
          body: "a new dawn has come.",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
    });
  });


});
