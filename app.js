const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

require("./src/middlewares/auth"); //signup and login middleware

// console.log(process.env);

// const PORT = 4000;

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(authRoutes);
app.use(blogRoutes);
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         msg : "welcome to home page"
//     })
// })

module.exports = app;
