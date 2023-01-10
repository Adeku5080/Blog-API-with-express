const mongoose = require("mongoose");

const connectDb = (uri) => {
  mongoose
    .connect(uri)
    .then(() => console.log("db connection succesful"))
    .catch((err) => console.log(err));
};

module.exports = connectDb;
