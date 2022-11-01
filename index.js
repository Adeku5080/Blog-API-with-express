const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
 const userRouter = require("./routes/userRoutes")
 const blogRouter = require("./routes/blogRoutes")



const PORT = 4000;

const app = express();

// middlewares
app.use(morgan('dev'))
app.use(express.json());

app.use(userRouter)
app.use(blogRouter)
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         msg : "welcome to home page"
//     })
// })


mongoose.connect("mongodb://localhost:27017/blog");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT ,()=>{
    console.log(`listen on port ${PORT}`)
})
