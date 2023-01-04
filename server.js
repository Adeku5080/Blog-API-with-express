const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./logger/logger")

const PORT = 4000;

mongoose.connect(
  "mongodb+srv://tohbaba:Adeku1997@cluster0.htsowjn.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});

app.listen(PORT, () => {
  logger.info(`listen on port ${PORT}`);
});
