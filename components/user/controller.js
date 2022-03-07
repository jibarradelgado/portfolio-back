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
      reject('[userController]: There are no saved users');
    }
  });
}

function updateUser(id, name) {
  return new Promise(async (resolve, reject) => {
    if (!id || !name) {
      reject('[userController]: Invalid data');
    }

    const result = await store.update(id, name);
    resolve(result);
  });
}

function deleteUser(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject('[userController]: Invalid data');
    }

    const result = await store.remove(id);
    resolve(result);
  })
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
}