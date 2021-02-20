import mongoose from "mongoose"
require("dotenv").config()

const DB_CONNECTION_STRING = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
const DB_CONNECTION_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}
function init_db_connection() {
  console.log("init_db_connection")
  mongoose
    .connect(DB_CONNECTION_STRING, DB_CONNECTION_OPTIONS)
    .then(function () {
      console.log("MongoDB is connected")
    })
    .catch(function (err) {
      console.log(err)
    })
}
export default init_db_connection
