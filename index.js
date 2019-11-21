const express = require("express");
const mongosse = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(4000, () => {
  console.log("Server Started");
});
