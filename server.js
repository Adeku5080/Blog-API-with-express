const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect("mongodb://localhost:27017/blog");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
