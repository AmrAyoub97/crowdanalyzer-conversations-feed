import express from "express"
import init_db_connection from "./clients/db"
import { init_es_index } from "./clients/es-client"
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
init_es_index()
init_db_connection()
app.use("/feeds", require("./routes/feeds"))

// start the express server
const server = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`)
})
module.exports = server
