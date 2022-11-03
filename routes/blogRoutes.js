const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blogController")
const passport = require('passport');

blogRouter.get('/blogposts',blogController.getAllPosts)
blogRouter.post('/blogposts',passport.authenticate('jwt',{session:false}),blogController.createAPost)
blogRouter.get('/blogposts/:id',blogController.getAPost)
blogRouter.patch('/blogposts/:id',blogController.updateAPost)
blogRouter.delete('/blogposts/:id',blogController.deleteAPost)

module.exports = blogRouter;