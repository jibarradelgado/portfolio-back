const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const store = require('./store');

async function addAuth(data) {
  if (!data.username) {
    return Promise.reject('No username found');
  }
  if (!data.password) {
    return Promise.reject('No password found');
  }
  const authData = {
    username: data.username,
    password: await bcrypt.hash(data.password, 5),
  };
  return store.add(authData);
}

async function login(username, password) {
  const data = await getAuth(username);
  const areEquals = await bcrypt.compare(password, data[0].password);
  if (areEquals) {
    return auth.sign(data[0]);
  } else {
    throw new Error('Invalid information');
  }
}

async function getAuth(filterAuthByUsername) {
  return new Promise((resolve, reject) => {
    if(store.list()) {
      resolve(store.list(filterAuthByUsername));
    } else {
      reject('[authController]: There are no saved auths');
    }
  });
}

async function updateAuth(data) {
  if (!data._id || (!data.username && !data.password)) {
    return Promise.reject('Invalid data');
  }

  const authData = {
    _id: data._id,
  };
  if (data.username) {
    authData.username = data.username;
  }
  if (data.password) {
    authData.password = await bcrypt.hash(data.password, 5);
  }
  return store.update(authData);
}

function deleteAuth(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject('[AuthController]: Invalid data');
    }

    const result = await store.remove(id);
    resolve(result);
  })
}

module.exports = {
  addAuth,
  getAuth,
  updateAuth,
  deleteAuth,
  login,
}