const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
    id:ObjectId,
    created_at : Date,

    title :{
     type:String,
     required:[true,'title must be provided']
    },

    description:{
    type:String,
    required:[true,'description must be provided']
    },

    tags:{
     type:String,
     enum:['sport','entertainment','fashion']
    },

    author:{
        type:String,
        required:[true,'name of author is required']
    }

    
})