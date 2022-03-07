const store = require('./store');

function addUser(name) {
  if (!name) {
    return Promise.reject('Invalid name');
  }

  const user = {
    name,
  };

  return store.add(user);
}


function getUsers(filterUsersByName) {
  return new Promise((resolve, reject) => {
    if(store.list()) {
      resolve(store.list(filterUsersByName));
    } else {
      reject('[assetController]: There are no saved users');
    }
  });
}

module.exports = {
  addUser,
  getUsers,
}