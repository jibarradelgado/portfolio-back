const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    if (decoded._id !== owner) {
      throw error('You cannot do this', 401);
    }
  },
};

function getToken(auth) {
  if (!auth) {
    throw new Error('There is no token');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid format');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};