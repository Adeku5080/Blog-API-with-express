const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPostSchema = new Schema({
    id:ObjectId,
    created_at : Date,

    title :{
     type:String,
     required:[true,'title must be provided'],
     unique:true
    },

    description:{
    type:String,
    },

    body:{
        type:String,
     required:[true,'body must be provided']
    },

    tags:[String],

    author:{
        type:String
    },
    owner_id : {
         type:String,

    },
    state:{
       type:String,
       enum:['draft','published'],
       default:'draft'
    },

   read_count:{
    type:Number,
    default:0
   },

   reading_time:{
    type:Number
   },

    createAt: {
        type: Date,
        default: Date.now(),
      },

    
})

const BlogPost = mongoose.model("BlogPost",BlogPostSchema);

module.exports = BlogPost