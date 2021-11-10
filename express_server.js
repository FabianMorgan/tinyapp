const express = require('express');
const app = express ();
const PORT = 8080; //default port 8080

//Set ejs as the view engine.
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello! I am Fabian.");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>Friend!</b></body></html>\n");
});

app.get("/About-Me", (req, res) => {
  res.send("I am a student web developer at Lighthouse Labs.")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
