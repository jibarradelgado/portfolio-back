const auth = require('../../../auth');

function checkAuth(action) {
  function middleware(req, res, next) {
    switch(action) {
      case 'get':
        const owner = req.params.auth;
        auth.check.own(req, owner);
        next();
        break;
      case 'update':
      case 'post':
        owner = req.body.auth.id;
        auth.check.own(req, owner);
        next();
        break;
      default:
        next();
    }
  }
  return middleware;
}

module.exports = {
  checkAuth,
}