const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const store = require('./store');
const userStore = require('../user/store');

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

function generateUserData(user, auth) {
  const user_auth = {
    userId: user._id.toString(),
    _id: auth._id.toString(),
    username: auth.username
  };
  return user_auth;
}

async function login(username, password) {
  const data = await getAuth(username);
  const areEquals = await bcrypt.compare(password, data[0].password);
  if (areEquals) {
    const user = await userStore.listByAuthId(data[0]._id);
    const user_auth = generateUserData(user[0], data[0]);
    return auth.sign(user_auth);
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

async function getAllAuths(filterAuthByUsername) {
  return new Promise((resolve, reject) => {
    if(store.listAll()) {
      resolve(store.listAll(filterAuthByUsername));
    } else {
      reject('[authController]: There are no saved auths');
    }
  });
}

async function updateAuth(data) {
  if (!data.id || (!data.username && !data.password)) {
    return Promise.reject('[authController]: Invalid data');
  }

  const authData = {
    _id: data.id,
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
  getAllAuths,
  updateAuth,
  deleteAuth,
  login,
}