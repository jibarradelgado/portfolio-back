const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data.toJSON(), secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log(decoded._id);
    if (decoded._id !== owner) {
      throw new Error('You cannot do this');
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