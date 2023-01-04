const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const httpLogger = require("./logger/httpLogger");

require("./src/middlewares/auth"); //signup and login middleware

const app = express();

// middlewares
app.use(express.json());
app.use(httpLogger);


app.use(authRoutes);
app.use(blogRoutes);

module.exports = app;
