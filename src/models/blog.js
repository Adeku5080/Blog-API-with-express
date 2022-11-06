const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
  id: ObjectId,

  title: {
    type: String,
    required: [true, "title must be provided"],
    unique: true,
  },

  description: {
    type: String,
  },

  body: {
    type: String,
    required: [true, "body must be provided"],
  },

  tags: [String],

  author: {
    type: String,
  },
  owner_id: {
    type: String,
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },

  read_count: {
    type: Number,
    default: 0,
  },

  reading_time: {
    type: Number,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
