const bcrypt = require('bcrypt');
const { isValidString } = require('./validators');

/*
  turns passwords into hash using bcrypt
  returns null when the password is not a valid string
*/
function hashPassword(password, salt = 10) {
  if (!isValidString(password)) {
    return null;
  }

  return bcrypt.hashSync(password, salt);
}

//Is the password equal than the hashed?
function comparePassword(password, hash) {
  if (!isValidString(password) || !isValidString(hash)) {
    return false;
  }

  return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };