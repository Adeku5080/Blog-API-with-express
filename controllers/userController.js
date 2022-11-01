const User = require("../models/userModel")

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            status:"succesful",
            data:{
                users
            }
        })
    }catch(err){
        console.log(err)
    }
}

exports.createAUser = async(req,res)=>{
    try{
        const newUser = await User.create(req.body);
        res.status(201).json({
            status:"success",
            data:{
              user : newUser 
            }
        })
    }catch(err){
      console.log(err)
    }
}

