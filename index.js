const express = require('express');
const mongoose = require("mongoose");


const PORT = 4000;

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        msg : "welcome to home page"
    })
})

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
