const users = { 
  userRandomID: {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "one"
  },
  user2RandomID: {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dish"
  }
}

function findUser (email, users) {
  let foundUser;
  const usersArr = Object.values(users);
  for (let i = 0; i < usersArr.length; i++) {
    const user = usersArr[i];
    if (user.email === email) {
      foundUser = user;
      break;
    }
  }
  return foundUser;
}



const generateRandomString = (length) => {

  const characters ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
      let randomCharacters = ' ';
     
      for ( let i = 0; i < length; i++ ) {
          randomCharacters += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomCharacters;
    }
  //generateRandomString();

  module.exports = {users, generateRandomString, findUser}