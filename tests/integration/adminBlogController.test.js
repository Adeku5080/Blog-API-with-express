const request = require("supertest");
const app = require("../../app");
const UserModel = require("../../src/models/user");
const Blog = require("../../src/models/blog");

let token;
let owner;

//Admin controller
describe("Blog Controller", () => {
  beforeEach(async () => {
    owner = await UserModel.create({
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
    it("should return 200 and all posts", async () => {
      const response = await request(app).get("/blogs");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data")
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

  //get a post
  describe("get a post", () => {
    let post;

    beforeEach(async () => {
      post = await Blog.create({
        title: "test post",
        body: "my testing skill is getting better",
        owner_id: `${owner._id}`,
      });
    });

    it("should return 200 and the post", async () => {
      const response = await request(app)
        .get(`/user/blogs/${post._id}`)
        .set("owner_id", `${owner._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });

  //update a post
  describe("partial update", () => {
    let blog;

    beforeEach(async () => {
      blog = await Blog.create({
        title: "test post",
        body: "my testing skill is getting better",
        owner_id: `${owner._id}`,
      });
    });

    it("should return 404 if blog does not exist", async () => {
      const response = await request(app)
        .patch(`/user/blog/10002`)
        .send({})
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("should check if the post exists", async () => {
      postToUpdate = await Blog.findOne({
        _id: post._id,
        owner_id: `${owner._id}`,
      });
    });

    const data = {
      title: "my updated post" || postToUpdate.title,
      description:
        "I might have finally grasped the concept of testing" ||
        postToUpdate.description,
    };

    it("should update a post ", async () => {
      const response = await request(app)
        .patch(`/user/blog/${postToUpdate._id}`)
        .send(data)
        .set("owner_id", `${owner._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });

  //delete a post
  describe("delete a post", () => {
    let post;
    beforeEach(async () => {
      post = await Blog.create({
        title: "this is the post to delete",
        body: "I am creating this to test if my delete post testcase is functioning as it should",
        owner_id: `${owner._id}`,
      });
    });

    let postToDelete;
    it("should check if the post exists", async () => {
      postToDelete = await Blog.findOne({
        _id: post._id,
        owner_id: `${owner._id}`,
      });
    });

    it("should delete the post", async () => {
      const response = await request(app)
        .delete(`/user/blog/${postToDelete._id}`)
        .set("_id", `${postToDelete._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });
});
