const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  created_at: Date,

  first_name: {
    type: String,
    required: [true, "firstname must be provided"],

  },
  last_name:{
    type:String,
    required:[true,"lastname must be provided"]
  },
  email:{
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "A password must be provided"],
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
