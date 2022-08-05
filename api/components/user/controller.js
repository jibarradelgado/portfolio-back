const store = require('./store');
const authStore = require('../auth/store');

async function addUser(body) {
  if (!body.name) {
    return Promise.reject('No name found');
  }
  if (!body.username) {
    return Promise.reject('No username found');
  }
  if (!body.password) {
    return Promise.reject("No password found");
  }

  const auth = {
    username: body.username,
    password: body.password
  }
  try {
    const newAuth = await authStore.add(auth);
    const user = {
      name: body.name,
      auth: newAuth,
    };
    return store.add(user);
  } catch (err) {
    return Promise.reject(err);
  }
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

function updateUser(id, body) {
  return new Promise(async (resolve, reject) => {
    if (!id || !body) {
      reject('[userController]: Invalid data');
    }

    if (body.auth.username || body.auth.password) {
        try {
          const auth = await authStore.update(body.auth);
          resolve (auth);
        } catch (err) {
          return Promise.reject(err);
        }
    } else {
      const result = await store.update(id, body);
      resolve(result);
    }
  });
}

function deleteUser(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(body);
      if (!id) {
        reject('[userController]: Invalid data');
      }
      if (!body.id) {
        reject('[userController]: Invalid data');
      }

      const successAuth = await authStore.remove(body.id);
      if (successAuth) {
        const result = await store.remove(id);
        resolve(result);
      } else {
        reject("[userController]: couldn't remove auth");
      }
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
}