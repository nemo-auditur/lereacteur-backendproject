const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(4000, () => {
  console.log("Server Started");
});

mongoose.connect("mongodb://localhost/backend-project", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
