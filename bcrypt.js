console.log('bcrypt')
const bcrypt = require('bcrypt');
const password = "increase"


bcrypt.hash(password, 10, (err, hash) => {
  console.log(err);
  console.log(hash);
  
});

bcrypt.hash(password, 10).then((hash) => {
  console.log(hash);
});