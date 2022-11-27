const request = require("supertest");
const app = require("../../app");
const UserModel = require("../../src/models/user");

const BlogPost = require("../../src/models/blog");
const { post } = require("../../app");
const user = require("../../src/models/user");

let token;
let owner;

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

  //get a post
  describe("get a post", () => {
    let post;

    beforeEach(async () => {
      // owner = await UserModel.create({
      //   email: "mohammed.aam@gmail.com",
      //   password: "Adeku123",
      //   last_name: "Adeku",
      //   first_name: "Ali",
      // });

      post = await BlogPost.create({
        title: "test post",
        body: "my testing skill is getting better",
        owner_id : `${owner._id}`
      });
      console.log(post);
    });

    it("should get a post", async () => {
      const response = await request(app)
        .get(`/user/blogs/${post._id}`)
        .set("owner_id", `${owner._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  //update a post
  // describe("update a post",() => {
  //   it("should create a post",async ()=>{
  //     const post = await BlogPost.create({
  //    title : "test post",
  //    body : "my testing skill is getting better"
  //  })
  //  })

  //  const data ={
  //   title:"updated title",
  //   body :"updated body"
  //  }

  //  it("should update a post " ,async()=>{
  //    const response = await request(app)
  //    .patch('/user/blog' + post.id)
  //    .send(data)
  //    .set("Authorization", `Bearer ${token}`);

  //    expect(response.status)
  //  })
  // })
});
