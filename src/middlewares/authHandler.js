const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { RequestError } = require('../utils/RequestError');
const { isValidString } = require('../utils/validators');
const { getEnvConfig } = require('../config/dotenv');

function authHandler(req, _, next) {
  const token = req.headers.authorization;

  if (!isValidString(token)) {
    throw new RequestError('User not authenticated', StatusCodes.UNAUTHORIZED);
  }

  const envConfig = getEnvConfig();

  jwt.verify(token, envConfig.jwt.secretKey, (err, decodedUser) => {
    if (err) {
      throw new RequestError(err.message, StatusCodes.UNAUTHORIZED);
    }

    req.user = decodedUser;

    next();
  });
}

module.exports = { authHandler };