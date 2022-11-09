const request = require("supertest");
const app = require("../../app");
const UserModel = require("../../src/models/user");

describe("Auth Controller", () => {
  describe("signup", () => {
    it("should return a validation error if email is not provided", async () => {});

    it("should create a new user", async () => {
      const response = await request(app)
        .post("/signup")

        .set("content-type", "application/json")
        .send({
          password: "Adeku123",
          first_name: "Ali",
          last_name: "Adeku",
          email: "aliadeku.aam@gmail.com",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("user");
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      const user = await UserModel.create({
        email: "aliadeku.aam@gmail.com",
        password: "Adeku123",
        first_name: "Ali",
        last_name: "Adeku",
      });

      // login user
      const response = await request(app)
        .post("/login")
        .set("content-type", "application/json")
        .send({
          email: "aliadeku.aam@gmail.com",
          password: "Adeku123",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
  });
});
