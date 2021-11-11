const express = require('express');
const app = express ();
const morgan = require('morgan');
const PORT = 8080; //default port 8080
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

//Middleware
// REQ -----> Server ----> MIDDLEWARE <----> Route ----> EJS to HTML conversion ----> RES
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

//Set ejs as the view engine.
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": {
    longUrl: "http://www.lighthouselabs.ca",
    userId: "userRandomID"
  },
  "9sm5xK": {
    longUrl: "http://www.google.com",
    userId: "userRandomID"
  }
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

const users = { 
  userRandomID: {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  user2RandomID: {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

// register a new user
app.get('/register', (req, res) => {
  const user_id = req.cookies.user_id;
  if (user_id) {
    return res.redirect('/urls');
  }
  const user = users[user_id];
  res.render("register", { user });
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === '') {
    res.status(400).send("Email must not be empty");
  }
  if (password === '') {
    res.status(400).send("Password must not be empty");
  }

  const numberOfUsers = Object.keys(users).length;
  const userId = `user${numberOfUsers + 1}RandomID`;

  users[userId] = {
    id: userId,
    email,
    password
  };

  // set new user id into cookie & redirect to urls
  res.cookie('user_id', userId);

  res.redirect("/urls");
});

// login existing user
app.get('/login', (req, res) => {
  const user_id = req.cookies.user_id;
  if (user_id) {
    return res.redirect('/urls');
  }
  const user = users[user_id];
  res.render("login", { user });
});

function findUser (email, password) {
  let foundUser;
  const usersArr = Object.values(users);
  for (let i = 0; i < usersArr.length; i++) {
    const user = usersArr[i];
    if (user.email === email && user.password === password) {
      foundUser = user;
      break;
    }
  }
  return foundUser;
}

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const foundUser = findUser(email, password);

  if (foundUser && foundUser.id) {
    // set found user id into cookie & redirect to urls
    res.cookie('user_id', foundUser.id);

    res.redirect("/urls");
  }

  res.status(400).send("Incorrect Login");
});

app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/login');
});

app.get("/urls", (req, res) => {
  const user_id = req.cookies.user_id;
  if (!user_id) {
    return res.redirect('/login');
  }
  const user = users[user_id];
  const templateVars = { urls: urlDatabase, user };
  console.log(templateVars);
  res.render("urls_index", templateVars);
});

//Add get route to show form in urls_new.ejs
app.get('/urls/new', (req, res) => {
  const user_id = req.cookies.user_id;
  if (!user_id) {
    return res.redirect('/login');
  }
  const user = users[user_id];
  res.render("urls_new", { user });
});

app.get("/urls/:shortURL", (req, res) => { 
  const user_id = req.cookies.user_id;
  if (!user_id) {
    return res.redirect('/login');
  }
  const user = users[user_id];
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longUrl, user };
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
  const user_id = req.cookies.user_id;
  console.log(req.body); //Log the POST request body to the console.
  //Update express server so shortURL-longURL key-value pair are saved to the urlDatabase when it receives a POST request to /urls
  const shortURL = generateRandomString(6);
  const longURL = req.body.longURL; 
  // Update the database, urlDatabase
  urlDatabase[shortURL] = {
    longURL,
    userId: user_id
  };  
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

