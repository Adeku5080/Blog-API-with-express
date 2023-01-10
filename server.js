const app = require("./app");
const logger = require("./logger/logger");
const connectDb = require("./database/connect");

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});

connectDb(
  "mongodb+srv://tohbaba:Adeku1997@cluster0.htsowjn.mongodb.net/?retryWrites=true&w=majority"
);
