const jwt = require('jsonwebtoken');

function sign(data) {
  jwt.sign(data.toJSON(), 'secret');
}

module.exports = {
  sign,
};