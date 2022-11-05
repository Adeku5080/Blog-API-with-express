const { find, findOne } = require("../models/blogModel");
const BlogPost = require("../models/blogModel");
const Blog = require("../models/blogModel");

const avgTimeToReadAWord = 0.5;

exports.createAPost = async (req, res) => {
  const postBody = req.body.body;
  const length = postBody.split(" ").length;
  const readingTime = avgTimeToReadAWord * length;
  // console.log(reading_time);

  const requestObject = {
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    reading_time: readingTime,
    owner_id: req.body.owner_id,
  };
  try {
    const newPost = await BlogPost.create(requestObject);
    res.status(201).json({
      status: "success",
      post: newPost,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllPosts = async (req, res) => {
  const ownerId = req.body.owner_id;
  try {
    if(!ownerId){

       const publishedPosts = await BlogPost.find({ state: "published" });
     
      return res.status(200).json({
        data: publishedPosts,
      })
    }else{
      const posts = await BlogPost.find({owner_id : ownerId})

      res.status(200).json({
        data:{
          posts
        }
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred",
    });
  }
};

exports.getAPost = async (req, res) => {
  const postId = req.params.id;
  let postCount;
  try {
    if(req.method === "GET"){
       const post = await BlogPost.findById({_id :postId})
      //  console.log(post.read_count);
       postCount = post.read_count + 1;
    }
    let post = await BlogPost.find({ _id: postId, state: "published" });
       

    if (post.length == 0) {
      res.status(404).json({
        message: "no post with this id is published",
      });
    } else {
      res.status(200).json({
        status: "succesful",
        data: {
          post,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateAPost = async (req, res) => {
  const postId = req.params.id;
  const postBody = req.body;
  const ownerId = req.body.owner_id;

  try {
    const post = await BlogPost.findOne({ _id: postId });
    if (post.owner_id === ownerId) {
      const updatedPost = await BlogPost.findByIdAndUpdate(postId, postBody, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        data: {
          updatedPost,
        },
      });
    } else {
      res.status(401).json({
        messeage: "you are not allowed to update this post",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAPost = async (req, res) => {
  const postId = req.params.id;
  const ownerId = req.body.owner_id
  try {
    const post = await BlogPost.findOne({ _id: postId });
    if(post.owner_id === ownerId){
      await BlogPost.findByIdAndDelete(postId);
      res.status(204).json({
        status: "succesful",
      });
    }else{
      res.status(401).json({
        message :"You are not allowed to delete this blogPost"
      })
    }
   
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
