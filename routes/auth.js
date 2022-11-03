const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

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

authRouter.post(
    '/login',
    passport.authenticate('login', {session : false}),
    async (req,res,next)=>{  
        
        const body = {_id : req.user._id,email: req.user.email};

                const token = jwt.sign({user:body},process.env.JWT_SECRET,{expiresIn : '1h'})

                return res.json({token})
    })
        
      
//       passport.authenticate('login',async (err,user,info)=>{
//         try{
//             if(err){
//                 return next(err);
//             }
//             if(!user){
//                 const error = new Error('email or password is incorrect');
//                 return next(error);
//             }

//             req.login(user,{session:false},
//                 async (error)=>{
//                     if(error) return next(error);

//                 const body = {_id : user._id,email: user.email};

//                 const token = jwt.sign({user:body},process.env.JWT_SECRET)

//                 return res.json({token})

//                 })
//         }catch(error){
//             return next(error)
//         }
//       })

//     }
// )

module.exports = authRouter