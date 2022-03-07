const Model = require('./model');

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}

async function getUsers(filterUsersByName) {
  let filter = {};
  if (filterUsersByName !== null) {
    filter = { name: filterUsersByName};
  }
  const users = await Model.find(filter);
  return users;
}


module.exports = {
  add: addUser,
  list: getUsers,
}