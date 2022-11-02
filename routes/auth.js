const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config

const authRouter = express.Router();


authRouter.post(
    '/signup',
    passport.authenticate('signup',{session:false}),async(req,res,next)=>{
        res.json({
          message:"Signup Succesful",
          user : req.user
        })
    }
)

module.exports = authRouter