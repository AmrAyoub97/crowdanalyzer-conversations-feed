import express from "express";
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/feeds", require("./routes/feeds"));

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
