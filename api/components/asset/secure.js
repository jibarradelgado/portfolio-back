const auth = require('../../../auth');

function checkAuth(action) {
  function middleware(req, res, next) {
    let owner;
    switch(action) {
      case 'get':
      case 'delete':
        owner = req.params.auth;
        auth.check.own(req, owner);
        next();
        break;
      case 'patch':
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