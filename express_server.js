const express = require('express');
const app = express ();
const PORT = 8080; //default port 8080

//Set ejs as the view engine.
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


// index page or Home page.
app.get("/", (req, res) => {
  res.send("Hello! I am Fabian.");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>Friend!</b></body></html>\n");
});
// About page with ejs.
app.get("/About-Me", (req, res) => {
  res.send("I am a student web developer at Lighthouse Labs.")
});

//Passed the data from the object: urlDatabase to use to keep track of all URLs & their shortened forms. This is the data we want to show on the URLs page.

// use res.render to load up an ejs view file

app.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {  
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase };
  res.render("urls_show", templateVars)
}); 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
