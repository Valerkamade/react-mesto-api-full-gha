const { ERROR_AUTH } = require('../utils/constants');

class NotFoundAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_AUTH;
    this.name = 'NotFoundAuth';
  }
}

module.exports = NotFoundAuth;
