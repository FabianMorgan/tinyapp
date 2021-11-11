const express = require('express');
const app = express ();
const morgan = require('morgan');
const PORT = 8080; //default port 8080
const bodyParser = require("body-parser");

//Middleware
// REQ -----> Server ----> MIDDLEWARE <----> Route ----> EJS to HTML conversion ----> RES
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

//Set ejs as the view engine.
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const generateRandomString = (length) => {

  const characters ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
      let randomCharacters = ' ';
     
      for ( let i = 0; i < length; i++ ) {
          randomCharacters += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomCharacters;
    }
  //generateRandomString();


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

// register a new user
app.get('/register', (req, res) => {
  res.render("register");
});

app.get("/urls", (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

//Add get route to show form in urls_new.ejs
app.get('/urls/new', (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {  
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars)
});

app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL] = req.body.long_url;
  res.redirect('/urls');
}); 

app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]; 
  res.redirect(longURL);
})

app.post('/urls', (req, res) => {
  console.log(req.body); //Log the POST request body to the console.
  //Update express server so shortURL-longURL key-value pair are saved to the urlDatabase when it receives a POST request to /urls
  const shortURL = generateRandomString(6);
  const longURL = req.body.longURL; 
  // Update the database, urlDatabase
  urlDatabase[shortURL] = longURL;  
  res.redirect(`/urls/${shortURL}`);
  //res.send("OK"); //Respond with "OK".
});

app.post('/urls/:shortURL/delete', (req, res) => {
  console.log("POST DELETED!");
  console.log(req.params.shortURL);
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

