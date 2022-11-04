const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

require("./authMiddleware/auth"); //signup and login middleware

// console.log(process.env);

const PORT = 4000;

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use("/", authRoute);
app.use(userRouter);
app.use(blogRouter);
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         msg : "welcome to home page"
//     })
// })

module.exports = app;
