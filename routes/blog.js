const express = require("express");
const passport = require("passport");

const userBlogController = require("../src/controllers/user/blogController");
const blogController = require("../src/controllers/blogController");

const blogRouter = express.Router();

// blog routes with user namespace
blogRouter.get(
  "/user/blogs",
  passport.authenticate("jwt", { session: false }),
  userBlogController.list
);

blogRouter.get(
  "/user/blogs/:id",
  passport.authenticate("jwt", { session: false }),
  userBlogController.view
);

blogRouter.post(
  "/user/blogs",
  passport.authenticate("jwt", { session: false }),
  userBlogController.create
);

blogRouter.patch(
  "/user/blogs/:id",
  passport.authenticate("jwt", { session: false }),
  userBlogController.partialUpdate
);

blogRouter.delete(
  "/user/blogs/:id",
  passport.authenticate("jwt", { session: false }),
  userBlogController.delete
);

// unguarded blogs routes
blogRouter.get("/blogs", blogController.list);

blogRouter.get("/blogs/:id", blogController.view);

module.exports = blogRouter;
