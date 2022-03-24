const auth = require('../../../auth');

function checkAuth(action) {
  function middleware(req, res, next) {
    switch(action) {
      case 'update':
        const owner = req.body.auth.id;
        console.log(owner);
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