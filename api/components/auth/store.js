const Model = require('./model');

function addAuth(auth) {
  const myAuth = new Model(auth);
  return myAuth.save();
}

async function getAuth(filterAuthByUsername) {
  let filter = {};
  if (filterAuthByUsername !== null) {
    filter = { username: filterAuthByUsername};
    const auth = await Model.find(filter);
    return auth;
  }
  else return null;
}

async function getAllAuths(filterAuthByUsername) {
  let filter = {};
  if (filterAuthByUsername !== null) {
    filter = { username: filterAuthByUsername};
  }
  const auth = await Model.find(filter);
  return auth;
}

async function updateAuth(data) {
  if(!data._id) {
    return Promise.reject('[authStore]: Invalid data');
  }

  const auth = await Model.findOne({
    _id: data._id
  });

  if (data.username) {
    auth.username = data.username;
  }
  if (data.password) {
    auth.password = data.password;
  }
  const newAuth = await auth.save();
  return newAuth;
}

function removeAuth(id) {
  return Model.deleteOne({
    _id:id
  })
}

module.exports = {
  add: addAuth,
  list: getAuth,
  listAll: getAllAuths,
  update: updateAuth,
  remove: removeAuth,
}