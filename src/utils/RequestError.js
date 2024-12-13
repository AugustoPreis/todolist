const { StatusCodes } = require('http-status-codes');

class RequestError extends Error {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message, statusCode) {
    super(message);

    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}

module.exports = { RequestError };