require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dbcloud = require("./config/keys").mongoURI;
const app = express();
const handle = require("./handlers");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;
const db = require("./models");
const routes = require("./routes");

app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to MongoDB
mongoose
  .connect(dbcloud, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB is Successfully connected.."))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});
app.use("/api/auth", routes.auth);
app.use("/api/polls", routes.poll);
app.use(handle.notFound);

app.use(handle.errors);

app.listen(port, console.log(`Server started on port ${port}`));
