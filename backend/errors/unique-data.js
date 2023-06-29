const { ERROR_NOT_UNIQUE } = require('../utils/constants');

class NotUniqueData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_UNIQUE;
    this.name = 'NotUniqueData';
  }
}

module.exports = NotUniqueData;
