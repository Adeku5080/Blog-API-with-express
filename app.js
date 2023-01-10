const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const httpLogger = require("./logger/httpLogger");
const errorHandler = require("./src/middlewares/error-handler");

require("./src/middlewares/auth"); //signup and login middleware

const app = express();

const cors = require("cors")
//swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require('yamljs')
const swaggerDocument = YAML.load("./swagger.yaml")


// middlewares
app.use(express.json());
app.use(cors())

app.use(httpLogger);

app.get("/",(req,res)=>{
    res.send('<h1>Blog API</h1><a href="/api-docs">documentation</a>')
})

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))

app.use(authRoutes);
app.use(blogRoutes);
app.use(errorHandler);

module.exports = app;
