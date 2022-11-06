const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,

  first_name: {
    type: String,
    required: [true, "firstname must be provided"],
  },
  last_name: {
    type: String,
    required: [true, "lastname must be provided"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: {
      validator: async (value) => {
        const userCollection = mongoose.connection.collections["users"];
        const user = await userCollection.findOne({ email: value });

        if (user) {
          return false;
        }
      },
      message: "The email address must be unique",
    },
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "A password must be provided"],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

//pre-hook to hash password and store it
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

//validate password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = mongoose.model("User", UserSchema);
