const app = require("./server");
const config = require("./config/config");
const mongoose = require("mongoose");

const db = process.env.MONGOURI;
const dbName = "tymer-database";
mongoose
  .connect(`${db}/${dbName}`, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`Server up on ${config.port}`);
});
