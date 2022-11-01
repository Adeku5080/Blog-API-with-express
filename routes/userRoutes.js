const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController")

userRouter.get('/users',userController.getAllUsers)
userRouter.post('/users',userController.createAUser)


module.exports = userRouter; 