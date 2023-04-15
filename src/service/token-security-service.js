const jwt = require('jsonwebtoken');

module.exports = {
  generateToken(data) {
    const token = jwt.sign({ message: data }, process.env.SECRET);
    return token;
  }
};
