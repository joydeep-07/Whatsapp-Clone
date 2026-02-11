const express = require("express");
const connectDB = require("./db");

const app = express();
const PORT = 3000;

// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("SERVER STARTED ON PORT " + PORT);
  }
});
