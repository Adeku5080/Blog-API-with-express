const BlogPost = require('../models/blogModel')
const Blog = require('../models/blogModel')


const avgTimeToReadAWord = 0.5;

exports.createAPost=async(req,res)=>{
    const postBody = req.body.body;
    const length = postBody.split(' ').length;
    const reading_time = avgTimeToReadAWord * length;
    console.log(reading_time);
  
    const requestObject ={
        title : req.body.title ,
        body : req.body.body,
        reading_time: reading_time
    }
  try{
    const newPost = await BlogPost.create(requestObject)
    res.status(201).json({
        status : 'success',
        post : newPost
    })
  }catch(err){
    console.log(err)
  }
}

exports.getAllPosts=async(req,res)=>{
    try{
        const posts = await BlogPost.find();
        res.status(200).json({
          status:"success",
          data:{
            posts
          }
        })
    }catch(err){
        console.log(err)
    }
  
}

exports.getAPost=async(req,res)=>{
   const postId = req.params.id
   console.log
   try{ const post = await BlogPost.findById(postId);
         res.status(200).json({
            status:"succesful",
            data:{
               post
            }
         })    

}catch(err){

   }
  
}

exports.updateAPost=async(req,res)=>{
  
}

exports.deleteAPost=async(req,res)=>{
    const postId = req.params.id
    try{
        await BlogPost.findByIdAndDelete(postId);
        res.status(204).json({
            status:'succesful'
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err,
          });
    }
}