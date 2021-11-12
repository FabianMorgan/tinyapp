console.log('bcrypt')
const bcrypt = require('bcrypt');


bcrypt.hash(password, 10, function(err, hash) {
  // Store hash in your password DB.
});