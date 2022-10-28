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

app.listen(PORT ,()=>{
    console.log(`listen on port ${PORT}`)
})
